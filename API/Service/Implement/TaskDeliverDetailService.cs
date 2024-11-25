using AutoMapper;
using DATA.Infastructure;
using DATA;
using Helper;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Reflection.PortableExecutable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System.Reflection.Metadata;
using System.Net.WebSockets;
using Dapper;

namespace Service.Implement
{
    public class TaskDeliverDetailService : ITaskDeliverDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<TaskDeliverDetail> _taskDeliverDetail;
        private readonly IMapper _mapper;
        public TaskDeliverDetailService( IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _taskDeliverDetail = _unitOfWork.TaskDeliverDetailRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(TaskDeliverDetailModel TaskDeliverDetailModel)
        {
            var _mapping = _mapper.Map<TaskDeliverDetail>(TaskDeliverDetailModel);
            try
            {
                await _taskDeliverDetail.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = TaskDeliverDetailModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = TaskDeliverDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, TaskDeliverDetailModel TaskDeliverDetailModel)
        {
            try
            {
                var map = _mapper.Map<TaskDeliverDetail>(TaskDeliverDetailModel);
                if (id != TaskDeliverDetailModel.TaskDeliverDetailID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _taskDeliverDetail.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = TaskDeliverDetailModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = TaskDeliverDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _taskDeliverDetail.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _taskDeliverDetail.DeleteAsync(value);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Data = id,
                        Success = true,
                        Message = "Delete Successfully"
                    };
                }
                catch (Exception ex)
                {
                    return new ApiResponeModel
                    {
                        Data = id,
                        Success = false,
                        Message = "There was an error during the data deletion process." + ex.Message
                    };
                }
            }
            return new ApiResponeModel
            {
                Data = id,
                Success = false,
                Message = "ID Not Found"
            };
        }

        public async Task<IEnumerable<TaskDeliverDetailModel>> GetAll()
        {
            var listEntity = await _taskDeliverDetail.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<TaskDeliverDetailModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _taskDeliverDetail.GetAsync(c => c.TaskDeliverDetailID == id);
            var entityMapped = _mapper.Map<TaskDeliverDetailModel>(entity);
            if (entityMapped == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = entityMapped,
                Success = true,
                Message = "Get Successfully!"
            };
        }

        public async Task<ApiResponeModel> UploadTaskRequest(UploadTaskRequestModel uploadTaskRequestModel)
        {
            try
            {
                List<TaskDeliverDetailModel> listTaskDeliverDetailModels = uploadTaskRequestModel.listTaskDeliverDetailModel;
                var dataTable = ConvertToDataTable(listTaskDeliverDetailModels);
                decimal taskDeliverAppID = uploadTaskRequestModel.taskDeliverAppModel.TaskDeliverAppID;
                var parameters = new DynamicParameters();
                parameters.Add("@TaskDeliverAppID", taskDeliverAppID);
                parameters.Add("@DetailsToAdd", dataTable.AsTableValuedParameter("dbo.TaskDeliverDetailType"));
                int result = await SQLHelper.ExecQueryNonDataAsync("SP_TASKDELIVERYDETAIL_INS", parameters, commandType: CommandType.StoredProcedure);
                
                if(result != 0)
                {
                    return new ApiResponeModel
                    {
                        Data = listTaskDeliverDetailModels,
                        Message = "Successfully!",
                        Success = true
                    };
                } else
                {
                    return new ApiResponeModel
                    {
                        Data = listTaskDeliverDetailModels,
                        Message = "Failed!",
                        Success = false
                    };
                }
                
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Data = uploadTaskRequestModel,
                    Message = "failed!" + ex.Message,
                    Success = false
                };
            }
        }
        private DataTable ConvertToDataTable(List<TaskDeliverDetailModel> details)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Imei", typeof(string));
            table.Columns.Add("CreateBy", typeof(string));
            table.Columns.Add("CreateDate", typeof(DateTime));

            foreach (var detail in details)
            {
                table.Rows.Add(detail.Imei, detail.CreateBy, DateTime.Now);
            }

            return table;
        }
    }
}


