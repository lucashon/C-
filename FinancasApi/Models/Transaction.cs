namespace FinancasApi.Models;

public class Transaction
{
    public int Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Value { get; set; }

    public string Type { get; set; } = string.Empty;

    public int PersonId { get; set; }

    public int CategoryId { get; set; }
}