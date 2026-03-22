using System.Text.Json;
using FinancasApi.Models;

namespace FinancasApi.Data;

public class JsonDb
{
    // Definição do caminho do arquivo físico onde os dados serão armazenados.
    private static readonly string FilePath = "database.json";

    // Estrutura de Tabelas em Memória:
    // Listas globais que armazenam os registros de Pessoas, Categorias e Transações durante a execução.
    public List<Person> Persons { get; set; } = new();
    public List<Category> Categories { get; set; } = new();
    public List<Transaction> Transactions { get; set; } = new();

    // Método de Inicialização (Load):
    // Responsável por ler o arquivo JSON e converter o texto de volta para objetos C#.
    public static JsonDb Load()
    {
        // Verificação de existência: Se o arquivo não existir (primeira execução), 
        // inicia uma nova instância vazia do banco.
        if (!File.Exists(FilePath)) return new JsonDb();
        
        // Leitura física do arquivo e conversão (deserialização) para a classe JsonDb.
        var json = File.ReadAllText(FilePath);
        return JsonSerializer.Deserialize<JsonDb>(json) ?? new JsonDb();
    }

    // Método de Persistência (Save):
    // Responsável por gravar o estado atual das listas de volta no arquivo físico.
    public void Save()
    {
        // Configuração de Serialização: 'WriteIndented' garante que o JSON gerado 
        // seja formatado com recuos, facilitando a leitura manual do arquivo.
        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(this, options);
        
        // Escrita definitiva no disco, sobrescrevendo o arquivo com os dados atualizados.
        File.WriteAllText(FilePath, json);
    }
}
