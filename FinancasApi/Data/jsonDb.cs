using System.Text.Json;
using FinancasApi.Models;

namespace FinancasApi.Data;

public class JsonDb
{
    private static readonly string FilePath = "database.json";

    public List<Person> Persons { get; set; } = new();
    public List<Category> Categories { get; set; } = new();
    public List<Transaction> Transactions { get; set; } = new();

    public static JsonDb Load()
    {
        if (!File.Exists(FilePath)) return new JsonDb();
        
        var json = File.ReadAllText(FilePath);
        return JsonSerializer.Deserialize<JsonDb>(json) ?? new JsonDb();
    }

    public void Save()
    {
        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(this, options);
        File.WriteAllText(FilePath, json);
    }
}
