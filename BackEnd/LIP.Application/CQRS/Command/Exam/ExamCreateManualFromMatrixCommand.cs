using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Exam;

public class ExamCreateManualFromMatrixCommand : IRequest<ExamCreateManualFromMatrixResponse>,
    IValidatable<ExamCreateManualFromMatrixResponse>
{
    public string? Title { get; set; }
    public string? Description { get; set; }

    public int DurationMinutes { get; set; }

    //public int GradeLevelId { get; set; }
    public int ExamTypeId { get; set; }

    public int CreatedByNavigationUserId { get; set; }

    //public DateTime CreatedAt { get; set; } //= DateTime.UtcNow;
    public int MatrixId { get; set; }
    public List<int> QuestionIds { get; set; } = new();

    public Task<ExamCreateManualFromMatrixResponse> ValidateAsync()
    {
        var response = new ExamCreateManualFromMatrixResponse();
        //if (string.IsNullOrEmpty(this.Title))
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "Title",
        //        Detail = "Title is not null or empty!"
        //    });
        //}
        //if (string.IsNullOrEmpty(this.Description))
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "Description",
        //        Detail = "Description is not null or empty!"
        //    });
        //}
        if (string.IsNullOrEmpty(DurationMinutes.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "DurationMinutes",
                Detail = "DurationMinutes is not null or empty!"
            });
        if (!int.TryParse(DurationMinutes.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "DurationMinutes",
                Detail = "DurationMinutes must be an Integer!"
            });
        if (DurationMinutes <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "DurationMinutes",
                Detail = "DurationMinutes must be larger than 0!"
            });
        //if (string.IsNullOrEmpty(GradeLevelId.ToString()))
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "GradeLevelId",
        //        Detail = "GradeLevelId is not null or empty!"
        //    });
        //if (!int.TryParse(GradeLevelId.ToString(), out _))
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "GradeLevelId",
        //        Detail = "GradeLevelId must be an Integer!"
        //    });
        //if (GradeLevelId <= 0)
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "GradeLevelId",
        //        Detail = "GradeLevelId must be larger than 0!"
        //    });
        if (string.IsNullOrEmpty(ExamTypeId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "ExamTypeId",
                Detail = "ExamTypeId is not null or empty!"
            });
        if (!int.TryParse(ExamTypeId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "ExamTypeId",
                Detail = "ExamTypeId must be an Integer!"
            });
        if (ExamTypeId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "ExamTypeId",
                Detail = "ExamTypeId must be larger than 0!"
            });
        if (string.IsNullOrEmpty(CreatedByNavigationUserId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByNavigationUserId",
                Detail = "ExamTypeId is not null or empty!"
            });
        if (!int.TryParse(CreatedByNavigationUserId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByNavigationUserId",
                Detail = "ExamTypeId must be an Integer!"
            });
        if (CreatedByNavigationUserId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByNavigationUserId",
                Detail = "ExamTypeId must be larger than 0!"
            });
        if (string.IsNullOrEmpty(MatrixId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByNavigationUserId",
                Detail = "ExamTypeId is not null or empty!"
            });
        if (!int.TryParse(MatrixId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByNavigationUserId",
                Detail = "ExamTypeId must be an Integer!"
            });
        if (MatrixId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByNavigationUserId",
                Detail = "ExamTypeId must be larger than 0!"
            });
        if (!QuestionIds.Any())
            response.ListErrors.Add(new Errors
            {
                Field = "QuestionIds",
                Detail = "QuestionIds must be added before creating exam!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}