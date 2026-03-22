using Microsoft.AspNetCore.Mvc;
using FinancasApi.Data;
using FinancasApi.Models;

namespace FinancasApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() 
    {
        var db = JsonDb.Load();
        return Ok(db.Persons);
    }

    [HttpPost]
    public IActionResult Create(Person person)
    {
        var db = JsonDb.Load();
        
        if (string.IsNullOrWhiteSpace(person.Name) || person.Name.Length > 200)
            return BadRequest("O nome é obrigatório e deve ter no máximo 200 caracteres.");

        person.Id = db.Persons.Any() ? db.Persons.Max(p => p.Id) + 1 : 1;
        
        db.Persons.Add(person);
        db.Save();
        return Ok(person);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Person personUpdate)
    {
        var db = JsonDb.Load();
        var person = db.Persons.FirstOrDefault(p => p.Id == id);
        
        if (person == null) return NotFound("Pessoa não encontrada.");

        if (string.IsNullOrWhiteSpace(personUpdate.Name) || personUpdate.Name.Length > 200)
            return BadRequest("Nome inválido.");

        person.Name = personUpdate.Name;
        person.Age = personUpdate.Age;

        db.Save();
        return Ok(person);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var db = JsonDb.Load();
        var person = db.Persons.FirstOrDefault(p => p.Id == id);
        if (person == null) return NotFound();

        db.Transactions.RemoveAll(t => t.PersonId == id);
        db.Persons.Remove(person);
        
        db.Save();
        return NoContent();
    }
}