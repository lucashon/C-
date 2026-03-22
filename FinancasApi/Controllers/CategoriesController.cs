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
        var db = JsonDb.Load();
        return Ok(db.Categories);
    }

  [HttpPost]
public IActionResult Create(Category category)
{
    var db = JsonDb.Load();

    if (string.IsNullOrWhiteSpace(category.Description) || category.Description.Length > 400)
        return BadRequest("A descrição deve ter no máximo 400 caracteres.");

    var validos = new[] { "despesa", "receita", "ambas" };
    if (!validos.Contains(category.Purpose.ToLower()))
        return BadRequest("O campo 'Purpose' deve ser 'despesa', 'receita' ou 'ambas'.");

    category.Id = db.Categories.Any() ? db.Categories.Max(c => c.Id) + 1 : 1;
    
    db.Categories.Add(category);
    db.Save();
    return Ok(category);
}
}