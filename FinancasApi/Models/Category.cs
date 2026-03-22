namespace FinancasApi.Models;

public class Category
{
    public int Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public string Purpose { get; set; } = string.Empty;
}