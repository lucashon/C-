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
        // Aqui eu carrego os dados direto do meu arquivo JSON para listar todas as categorias que já cadastrei.
        var db = JsonDb.Load();
        return Ok(db.Categories);
    }

    [HttpPost]
    public IActionResult Create(Category category)
    {
        var db = JsonDb.Load();
        
        // Aqui eu faço uma validação de entrada: se o nome da categoria estiver vazio 
        // ou passar de 400 caracteres, eu travo a ação e devolvo um erro para o usuário.
        if (string.IsNullOrWhiteSpace(category.Description) || category.Description.Length > 400)
            return BadRequest("A descrição deve ter no máximo 400 caracteres.");

        // Aqui eu garanto a consistência dos dados: o sistema só aceita se a categoria for 
        // um dos três tipos que eu defini (despesa, receita ou ambas). 
        // Isso evita que entrem dados errados que quebrariam os cálculos depois.
        var validos = new[] { "despesa", "receita", "ambas" };
        if (!validos.Contains(category.Purpose.ToLower()))
            return BadRequest("O campo 'Purpose' deve ser 'despesa', 'receita' ou 'ambas'.");

        // Aqui está a minha lógica de identificação: eu busco o maior ID que já existe e somo 1.
        // Assim, cada categoria ganha um número único, o que é fundamental para os meus relacionamentos.
        category.Id = db.Categories.Any() ? db.Categories.Max(c => c.Id) + 1 : 1;
        
        db.Categories.Add(category);
        
        // Depois de tudo validado, eu chamo o Save para gravar a nova categoria no arquivo JSON físico.
        db.Save(); 
        return Ok(category);
    }
}