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
        // Aqui eu carrego a minha base de dados JSON para listar todas as transações feitas.
        var db = JsonDb.Load();
        return Ok(db.Transactions);
    }

    [HttpPost]
    public IActionResult Create(Transaction transaction)
    {
        var db = JsonDb.Load();
        
        // Aqui eu faço uma verificação de integridade: eu busco a pessoa e a categoria no banco.
        // Se o usuário tentar lançar algo para um ID que não existe, eu travo na hora.
        var person = db.Persons.FirstOrDefault(p => p.Id == transaction.PersonId);
        var category = db.Categories.FirstOrDefault(c => c.Id == transaction.CategoryId);

        if (person == null || category == null)
            return BadRequest("Pessoa ou Categoria inválida. Verifique os dados e tente novamente.");

        // Aqui eu aplico uma regra de valores: como é um sistema financeiro, 
        // eu não deixo passar valores zerados ou negativos para não quebrar meus cálculos de saldo.
        if (transaction.Value <= 0)
            return BadRequest("O valor da transação deve ser positivo para manter a consistência dos cálculos.");
    
        // Aqui eu criei uma regra social: menores de 18 anos só podem registrar despesas.
        // Isso garante que os dependentes da casa não registrem receitas por conta própria.
        if (person.Age < 18 && transaction.Type.ToLower() == "receita")
            return BadRequest("Atenção: Menores de 18 anos só podem registrar despesas.");

        // Aqui eu faço a validação de compatibilidade: eu verifico se o tipo da transação (Receita/Despesa)
        // combina com o que foi configurado na categoria. Se a categoria for só de 'Despesa', 
        // eu não deixo o usuário lançar uma 'Receita' nela por engano.
        string tipo = transaction.Type.ToLower();
        string finalidade = category.Purpose.ToLower();

        if (finalidade != "ambas" && finalidade != tipo)
            return BadRequest($"Conflito de categoria: A categoria '{category.Description}' é exclusiva para {category.Purpose}.");

        // Aqui eu uso a lógica de ID Incremental: pego o maior ID que já existe e somo 1.
        // Isso simula o comportamento de um banco de dados profissional dentro do meu arquivo JSON.
        transaction.Id = db.Transactions.Any() ? db.Transactions.Max(t => t.Id) + 1 : 1;
        
        db.Transactions.Add(transaction);
        
        // Depois de passar por todas essas validações, eu salvo a transação no arquivo físico.
        db.Save(); 
        return Ok(transaction);
    }
}