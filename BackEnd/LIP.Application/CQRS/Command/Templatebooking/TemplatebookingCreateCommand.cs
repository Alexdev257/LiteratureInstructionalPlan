namespace LIP.Application.CQRS.Command.Templatebooking;

public class TemplatebookingCreateCommand
{
    public int? TemplateId
    {
        get; set;
    }

    public int? UserId
    {
        get; set;
    }
}