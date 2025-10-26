using AutoMapper;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;
using SchoolManagement.Context.Tables;
using SchoolManagement.Migrations;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.Services.Impls
{
    public class StudentExamService : IStudentExamService
    {
        private readonly IUnitOfWork _unitOfWork;

        private IMapper Mapper
        {
            get;
        }

        public StudentExamService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;

            Mapper = mapper;
        }

        public  async Task<int> Insert(StudentExamInsertDto studentExamDto)
        {
            try
            {
                var studentExam = Mapper.Map<StudentExam>(studentExamDto);
                await _unitOfWork.StudentExam.Insert(studentExam);
                return studentExam.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<bool> Update(StudentExamInsertDto StudentExamDto)
        {

            try
            {
                var entity = await _unitOfWork.StudentExam.FindById(StudentExamDto.Id);
                var studentExam = Mapper.Map(StudentExamDto, entity);
                int result = await _unitOfWork.StudentExam.Update(studentExam);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int studentExamId)
        {
            try
            {
                var StudentExam = await _unitOfWork.StudentExam.FindById(studentExamId);
                int result = await _unitOfWork.StudentExam.Delete(StudentExam);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<StudentExamDto>> GetAll()
        {
            var studentExams = _unitOfWork.StudentExam.Table;
            var Dtos = Mapper.Map<List<StudentExamDto>>(studentExams);
            return Dtos;
        }



        public async Task<int> InsertAnswer(StudentAnswerInsertDto StudentAnswerDto)
        {
            try
            {
                var studentAnswer = Mapper.Map<StudentAnswer>(StudentAnswerDto);
                await _unitOfWork.StudentAnswer.Insert(studentAnswer);
                return studentAnswer.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        public async Task<bool> UpdateAnswer(StudentAnswerInsertDto StudentAnswerDto)
        {

            try
            {
                var entity = await _unitOfWork.StudentAnswer.FindById(StudentAnswerDto.Id);
                var studentAnswer = Mapper.Map(StudentAnswerDto, entity);
                int result = await _unitOfWork.StudentAnswer.Update(studentAnswer);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteAnswer(int studentAnswerId)
        {
            try
            {
                var studentAnswer = await _unitOfWork.StudentAnswer.FindById(studentAnswerId);
                int result = await _unitOfWork.StudentAnswer.Delete(studentAnswer);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<StudentAnswerDto>> GetAllAnswers()
        {
            var studentAnswers = _unitOfWork.StudentAnswer.Table;
            var Dtos = Mapper.Map<List<StudentAnswerDto>>(studentAnswers);
            return Dtos;
        }
    }
}
