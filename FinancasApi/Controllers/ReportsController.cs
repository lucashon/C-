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
        // Aqui eu carrego o meu banco de dados JSON para começar os cálculos.
        var db = JsonDb.Load();

        // Lógica principal: Aqui eu percorro cada pessoa e calculo o somatório das transações dela.
        var report = db.Persons.Select(p => {
            // Aqui eu busco todas as transações que pertencem a essa pessoa específica (usando o ID).
            var trans = db.Transactions.Where(t => t.PersonId == p.Id).ToList();

            // Aqui eu separo e somo o que é Receita e o que é Despesa.
            // Uso o ToLower() para garantir que a comparação funcione mesmo se o texto vier diferente.
            var rec = trans.Where(t => t.Type.ToLower() == "receita").Sum(t => t.Value);
            var des = trans.Where(t => t.Type.ToLower() == "despesa").Sum(t => t.Value);
            
            return new { 
                id = p.Id, 
                name = p.Name, 
                totalReceita = rec, 
                totalDespesa = des, 
                saldo = rec - des // Aqui eu calculo automaticamente o saldo individual da pessoa.
            };
        }).ToList();
        
        // Aqui eu retorno o relatório pronto: mostro os dados individuais de cada um 
        // e também crio um resumo geral com o saldo total da residência.
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
        
        // Aqui a lógica é parecida, mas o foco é descobrir quanto a casa gastou por CATEGORIA.
        // Assim eu consigo saber, por exemplo, o total gasto só com 'Alimentação'.
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