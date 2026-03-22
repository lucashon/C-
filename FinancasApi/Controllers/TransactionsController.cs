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
        // Carrega a base de dados em memória para listar as transações cadastradas
        var db = JsonDb.Load();
        return Ok(db.Transactions);
    }

    [HttpPost]
    public IActionResult Create(Transaction transaction)
    {
        var db = JsonDb.Load();
        
        // Verificação de Integridade: Buscamos as referências para garantir que o lançamento 
        // está sendo vinculado a uma pessoa e categoria que realmente existam no sistema.
        var person = db.Persons.FirstOrDefault(p => p.Id == transaction.PersonId);
        var category = db.Categories.FirstOrDefault(c => c.Id == transaction.CategoryId);

        if (person == null || category == null)
            return BadRequest("Pessoa ou Categoria inválida. Verifique os dados e tente novamente.");

        // Regra de Negócio (Valores): Como estamos tratando de finanças, 
        // não permitimos valores nulos ou negativos para manter a consistência dos cálculos.
        if (transaction.Value <= 0)
            return BadRequest("O valor da transação deve ser positivo para manter a consistência dos cálculos.");
    
        // Regra de Negócio (Social): Menores de 18 anos são restritos apenas a lançamentos de despesas.
        // Isso evita que dependentes registrem receitas sem supervisão no sistema residencial.
        if (person.Age < 18 && transaction.Type.ToLower() == "receita")
            return BadRequest("Atenção: Menores de 18 anos só podem registrar despesas.");

        // Validação de Compatibilidade:
        // Aqui garantimos que uma categoria configurada apenas para "Receita" 
        // não seja usada em uma "Despesa" acidentalmente (ou vice-versa).
        string tipo = transaction.Type.ToLower();
        string finalidade = category.Purpose.ToLower();

        if (finalidade != "ambas" && finalidade != tipo)
            return BadRequest($"Conflito de categoria: A categoria '{category.Description}' é exclusiva para {category.Purpose}.");

        // Lógica de Identificação (ID Incremental): 
        // Simulamos o comportamento 'Auto-Increment' de bancos relacionais pegando o maior ID atual + 1.
        transaction.Id = db.Transactions.Any() ? db.Transactions.Max(t => t.Id) + 1 : 1;
        
        db.Transactions.Add(transaction);
        db.Save(); // Persiste a nova transação no arquivo físico JSON
        return Ok(transaction);
    }
}