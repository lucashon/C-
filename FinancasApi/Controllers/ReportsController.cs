using Microsoft.AspNetCore.Mvc;
using FinancasApi.Data;

namespace FinancasApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    [HttpGet("persons")]
    public IActionResult GetReportByPerson()
    {
        var db = JsonDb.Load();
        var report = db.Persons.Select(p => {
            var trans = db.Transactions.Where(t => t.PersonId == p.Id).ToList();
            var rec = trans.Where(t => t.Type.ToLower() == "receita").Sum(t => t.Value);
            var des = trans.Where(t => t.Type.ToLower() == "despesa").Sum(t => t.Value);
            
            return new { 
                id = p.Id, 
                name = p.Name, 
                totalReceita = rec, 
                totalDespesa = des, 
                saldo = rec - des 
            };
        }).ToList();

        return Ok(new {
            pessoas = report,
            totalGeral = new {
                receitaTotal = report.Sum(r => r.totalReceita),
                despesaTotal = report.Sum(r => r.totalDespesa),
                saldoLiquido = report.Sum(r => r.totalReceita) - report.Sum(r => r.totalDespesa)
            }
        });
    }

    [HttpGet("categories")]
    public IActionResult GetReportByCategory()
    {
        var db = JsonDb.Load();
        var report = db.Categories.Select(c => {
            var trans = db.Transactions.Where(t => t.CategoryId == c.Id).ToList();
            var rec = trans.Where(t => t.Type.ToLower() == "receita").Sum(t => t.Value);
            var des = trans.Where(t => t.Type.ToLower() == "despesa").Sum(t => t.Value);
            
            return new { 
                id = c.Id, 
                description = c.Description, 
                receitas = rec, 
                despesas = des, 
                saldo = rec - des 
            };
        }).ToList();

        return Ok(new { categorias = report });
    }
}