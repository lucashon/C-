using Microsoft.AspNetCore.Mvc;
using FinancasApi.Data;
using FinancasApi.Models;

namespace FinancasApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() 
    {
        // Carrega os dados do arquivo JSON para listar as categorias cadastradas
        var db = JsonDb.Load();
        return Ok(db.Categories);
    }

    [HttpPost]
    public IActionResult Create(Category category)
    {
        var db = JsonDb.Load();
        
        // Validação de entrada: Se a quantidade de caracteres for maior que 400 não continua a ação e devolve erro.
        // Isso evita textos excessivamente longos que poderiam prejudicar a visualização no sistema.
        if (string.IsNullOrWhiteSpace(category.Description) || category.Description.Length > 400)
            return BadRequest("A descrição deve ter no máximo 400 caracteres.");

        // Validação de consistência: Valida se o campo de categoria foi preenchido corretamente.
        // O sistema só prossegue se for um dos três tipos permitidos, garantindo a integridade dos dados.
        var validos = new[] { "despesa", "receita", "ambas" };
        if (!validos.Contains(category.Purpose.ToLower()))
            return BadRequest("O campo 'Purpose' deve ser 'despesa', 'receita' ou 'ambas'.");

        // Lógica de Identificação: Gera um ID novo diferente do criado anteriormente (valor atual + 1).
        // Essa técnica garante que cada categoria tenha um identificador único para os relacionamentos do sistema.
        category.Id = db.Categories.Any() ? db.Categories.Max(c => c.Id) + 1 : 1;
        
        db.Categories.Add(category);
        db.Save(); // Salva as alterações de volta no arquivo JSON
        return Ok(category);
    }
}