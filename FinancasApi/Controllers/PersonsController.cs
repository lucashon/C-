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
        // Recupera a lista completa de pessoas armazenadas no arquivo JSON
        var db = JsonDb.Load();
        return Ok(db.Persons);
    }

    [HttpPost]
    public IActionResult Create(Person person)
    {
        var db = JsonDb.Load();
        
        // Validação de entrada: Garante que o nome não esteja vazio e respeite o limite de caracteres.
        // Isso previne erros de preenchimento e mantém a integridade visual da interface.
        if (string.IsNullOrWhiteSpace(person.Name) || person.Name.Length > 200)
            return BadRequest("O nome é obrigatório e deve ter no máximo 200 caracteres.");

        // Lógica de Identificação: Gera um novo ID baseado no maior valor já existente + 1.
        // Garante a unicidade de cada registro dentro do sistema.
        person.Id = db.Persons.Any() ? db.Persons.Max(p => p.Id) + 1 : 1;
        
        db.Persons.Add(person);
        db.Save(); // Persiste a nova pessoa no arquivo de dados
        return Ok(person);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Person personUpdate)
    {
        var db = JsonDb.Load();
        var person = db.Persons.FirstOrDefault(p => p.Id == id);
        
        // Verifica se o registro solicitado existe antes de tentar a atualização
        if (person == null) return NotFound("Pessoa não encontrada.");

        // Validação de segurança para garantir que o novo nome fornecido é válido.
        if (string.IsNullOrWhiteSpace(personUpdate.Name) || personUpdate.Name.Length > 200)
            return BadRequest("Nome inválido.");

        // Atualização de campos específicos: Mantemos o ID original e atualizamos apenas Nome e Idade.
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
        
        // Retorno padrão caso o ID informado não corresponda a nenhum usuário.
        if (person == null) return NotFound();

        // Lógica de Integridade Referencial: Remove em cascata todas as transações ligadas a este ID.
        // Como o banco é um arquivo JSON, essa limpeza manual evita o acúmulo de dados órfãos.
        db.Transactions.RemoveAll(t => t.PersonId == id);
        db.Persons.Remove(person);
        
        db.Save();
        return NoContent();
    }
}