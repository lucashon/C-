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
        // Aqui eu recupero a lista de todo mundo que está salvo no meu arquivo JSON para exibir no Front.
        var db = JsonDb.Load();
        return Ok(db.Persons);
    }

    [HttpPost]
    public IActionResult Create(Person person)
    {
        var db = JsonDb.Load();
        
        // Aqui eu valido o nome: se estiver vazio ou for longo demais (mais de 200 letras), eu travo o cadastro.
        // Isso evita que o layout do meu React quebre com nomes gigantes.
        if (string.IsNullOrWhiteSpace(person.Name) || person.Name.Length > 200)
            return BadRequest("O nome é obrigatório e deve ter no máximo 200 caracteres.");

        // Aqui eu gero o ID único: pego o maior número que já existe na lista e somo 1.
        person.Id = db.Persons.Any() ? db.Persons.Max(p => p.Id) + 1 : 1;
        
        db.Persons.Add(person);
        
        // Aqui eu gravo a nova pessoa fisicamente no arquivo de dados.
        db.Save(); 
        return Ok(person);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Person personUpdate)
    {
        var db = JsonDb.Load();
        // Aqui eu procuro a pessoa pelo ID que veio na URL para ver se ela realmente existe no banco.
        var person = db.Persons.FirstOrDefault(p => p.Id == id);
        
        if (person == null) return NotFound("Pessoa não encontrada.");

        // Aqui eu faço a mesma validação de segurança do nome antes de autorizar a mudança.
        if (string.IsNullOrWhiteSpace(personUpdate.Name) || personUpdate.Name.Length > 200)
            return BadRequest("Nome inválido.");

        // Aqui eu atualizo apenas os campos permitidos, mantendo o ID original da pessoa intacto.
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

        // Aqui está uma parte vital: a lógica de integridade. 
        // Como estou deletando uma pessoa, eu também retiro todas as transações dela do sistema.
        // Isso evita que fiquem "dados órfãos" perdidos no meu arquivo JSON.
        db.Transactions.RemoveAll(t => t.PersonId == id);
        db.Persons.Remove(person);
        
        db.Save();
        return NoContent();
    }
}