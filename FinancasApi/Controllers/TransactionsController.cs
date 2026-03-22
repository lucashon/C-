using Microsoft.AspNetCore.Mvc;
using FinancasApi.Data;
using FinancasApi.Models;

namespace FinancasApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() 
    {
        var db = JsonDb.Load();
        return Ok(db.Transactions);
    }

    [HttpPost]
    public IActionResult Create(Transaction transaction)
    {
        var db = JsonDb.Load();
        var person = db.Persons.FirstOrDefault(p => p.Id == transaction.PersonId);
        var category = db.Categories.FirstOrDefault(c => c.Id == transaction.CategoryId);

        if (person == null || category == null)
            return BadRequest("Pessoa ou Categoria inválida.");

        if (transaction.Value <= 0)
            return BadRequest("O valor da transação deve ser positivo.");

        if (person.Age < 18 && transaction.Type.ToLower() == "receita")
            return BadRequest("Menores de 18 anos só podem registrar receitas.");

        string tipo = transaction.Type.ToLower();
        string finalidade = category.Purpose.ToLower();

        if (finalidade != "ambas" && finalidade != tipo)
            return BadRequest($"A categoria '{category.Description}' é apenas para {category.Purpose}.");

        transaction.Id = db.Transactions.Any() ? db.Transactions.Max(t => t.Id) + 1 : 1;
        
        db.Transactions.Add(transaction);
        db.Save();
        return Ok(transaction);
    }
}