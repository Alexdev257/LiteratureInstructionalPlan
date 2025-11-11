using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Exam;

public class ExamUpdateFromMatrixCommand : IRequest<ExamUpdateFromMatrixResponse>,
    IValidatable<ExamUpdateFromMatrixResponse>
{
    public int ExamId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int DurationMinutes { get; set; }
    public int ExamTypeId { get; set; }

    //public int GradeLevelId { get; set; }

    //public int MatrixId { get; set; }
    public List<int> QuestionIds { get; set; } = new();

    public Task<ExamUpdateFromMatrixResponse> ValidateAsync()
    {
        var response = new ExamUpdateFromMatrixResponse();
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
        //if (string.IsNullOrEmpty(this.CreatedByNavigationUserId.ToString()))
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "CreatedByNavigationUserId",
        //        Detail = "ExamTypeId is not null or empty!"
        //    });
        //}
        //if (!Int32.TryParse(this.CreatedByNavigationUserId.ToString(), out var _))
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "CreatedByNavigationUserId",
        //        Detail = "ExamTypeId must be an Integer!"
        //    });
        //}
        //if (this.CreatedByNavigationUserId <= 0)
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "CreatedByNavigationUserId",
        //        Detail = "ExamTypeId must be larger than 0!"
        //    });
        //}
        //if (string.IsNullOrEmpty(this.MatrixId.ToString()))
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "CreatedByNavigationUserId",
        //        Detail = "ExamTypeId is not null or empty!"
        //    });
        //}
        //if (!Int32.TryParse(this.MatrixId.ToString(), out var _))
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "CreatedByNavigationUserId",
        //        Detail = "ExamTypeId must be an Integer!"
        //    });
        //}
        //if (this.MatrixId <= 0)
        //{
        //    response.ListErrors.Add(new Errors
        //    {
        //        Field = "CreatedByNavigationUserId",
        //        Detail = "ExamTypeId must be larger than 0!"
        //    });
        //}
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