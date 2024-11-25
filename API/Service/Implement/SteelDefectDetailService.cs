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

namespace Service.Implement
{
    public class SteelDefectDetailService : ISteelDefectDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<SteelDefectDetail> _steelDefectDetailService;
        private readonly IRepository<ProductImei> _productImei;
        protected readonly IConfiguration Configuration;
        private readonly IMapper _mapper;


        public SteelDefectDetailService(IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _steelDefectDetailService = _unitOfWork.SteelDefectDetailRepository;
            _productImei = _unitOfWork.ProductImeiRepository;
            Configuration= configuration;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(SteelDefectDetailModel steelDefectDetailModel)
        {
            var _mapping = _mapper.Map<SteelDefectDetail>(steelDefectDetailModel);
            try
            {
                await _steelDefectDetailService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = steelDefectDetailModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = steelDefectDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, SteelDefectDetailModel steelDefectDetailModel)
        {
            try
            {
                var map = _mapper.Map<SteelDefectDetail>(steelDefectDetailModel);
                if (id != steelDefectDetailModel.SteelDefectDetailID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _steelDefectDetailService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = steelDefectDetailModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = steelDefectDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _steelDefectDetailService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _steelDefectDetailService.DeleteAsync(value);
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

        public async Task<IEnumerable<SteelDefectDetailModel>> GetAll()
        {
            var listEntity = await _steelDefectDetailService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<SteelDefectDetailModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _steelDefectDetailService.GetAsync(c => c.SteelDefectDetailID == id);
            var entityMapped = _mapper.Map<SteelDefectDetailModel>(entity);
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

        public async Task<IEnumerable<SteelDefectDetailModel>> GetListDefectByImei(string imei)
        {
            var listEntity = await _steelDefectDetailService.GetAllAsync(c=> c.Imei == imei);
            var mapList = _mapper.Map<IEnumerable<SteelDefectDetailModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> Insert(ProductImeiSteelDefectModel productImeiSteelDefectModel)
        {

            List<int> SteelDefectDetailsID = new List<int>();
            string procedureName1 = "SP_STEELDEFECTDETAIL_INS";
            string procedureName4 = "SP_STEELDEFECTDETAIL_DELETEALL";
            string procedureName2 = "SP_PRODUCTIMEI_INS";
            string procedureName3 = "SP_PRODUCTIMEI_UPD";

            if (productImeiSteelDefectModel.steelDefectDetailModels.Count()!=0)
            {

                try
                {
                    //string procedureCall4 = $"{procedureName4} @";
                    var listdef = productImeiSteelDefectModel.steelDefectDetailModels.ToList();
                    var para = new { Imei = listdef[0].Imei };
                    string procedureCall4 = $"{procedureName4} @Imei;";
                    int rowsAffected4 = await SQLHelper.ExecQueryNonDataAsync(procedureCall4, para);

                    foreach (var item in productImeiSteelDefectModel.steelDefectDetailModels)
                    {


                        var parameters1 = new
                        {
                            SteelDefectDetailID = 0, // Output parameter, initialized to 0
                            Imei = item.Imei,
                            main = item.Main,
                            Option1 = item.Option1,
                            Option2 = item.Option2,
                            Option3 = item.Option3,
                            Option4 = item.Option4,
                            SteelDefectName = item.SteelDefectName,
                            CreatedBy = item.CreatedBy
                        };

                        string procedureCall1 = $"{procedureName1} @SteelDefectDetailID OUTPUT, @Imei, @main, @Option1, @Option2, @Option3, @Option4, @SteelDefectName, @CreatedBy;";
                        int rowsAffected = await SQLHelper.ExecQueryNonDataAsync(procedureCall1, parameters1);

                        if (item.Imei != null)
                        {

                            var a = await _productImei.AnyAsync(p => p.Imei == item.Imei && item.Imei == productImeiSteelDefectModel.productImeiModel.Imei);
                            if (a == false)
                            {
                                var parameters2 = productImeiSteelDefectModel.productImeiModel;
                                string procedureCall2 = $"{procedureName2} @ProductImeiID OUTPUT, @ReceiptImeiID, @WorkProcessID, @Imei, @ProductID," +
                                    $" @Quantity, @Standard, @ProductionBatchNo, @GalvanizedOrganization, @SteelPrice, @Vendor, @SteelType, @Width, @Thickness," +
                                    $" @Weight1, @Weight2, @Weight3, @Specification, @Note, @Image1, @Image2, @Image3, @Image4, @ParentID, @CreatedBy, @CreatedDate;";
                                int rowsAffected2 = await SQLHelper.ExecQueryNonDataAsync(procedureCall2, parameters2);

                            }
                            else
                            {
                                var ProductImei = await _productImei.GetAsync(p => p.Imei == productImeiSteelDefectModel.productImeiModel.Imei);
                                productImeiSteelDefectModel.productImeiModel.ProductImeiID = ProductImei.ProductImeiID;
                                var parameters3 = productImeiSteelDefectModel.productImeiModel;
                                string procedureCall3 = $"{procedureName3} @ProductImeiID, @ReceiptImeiID, @WorkProcessID," +
                                    $" @Imei, @ProductID, @Quantity, @Standard, @ProductionBatchNo, @GalvanizedOrganization," +
                                    $" @SteelPrice, @Vendor, @SteelType, @Width, @Thickness, @Weight1, @Weight2, @Weight3, @Specification," +
                                    $" @Note, @Image1, @Image2, @Image3, @Image4, @ParentID, @CreatedBy, @CreatedDate;";
                                int rowsAffected3 = await SQLHelper.ExecQueryNonDataAsync(procedureCall3, parameters3);

                            }

                        }

                    }
                }catch(Exception e)
                {
                    return new ApiResponeModel()
                    {
                        Success = false,
                        Data = SteelDefectDetailsID,
                        Message = "add fail: "+e.Message
                    };
                };
            }
            else
            {
                var ProductImei = await _productImei.GetAsync(p => p.Imei == productImeiSteelDefectModel.productImeiModel.Imei);
                productImeiSteelDefectModel.productImeiModel.ProductImeiID = ProductImei.ProductImeiID;
                var parameters3 = productImeiSteelDefectModel.productImeiModel;
                string procedureCall3 = $"{procedureName3} @ProductImeiID, @ReceiptImeiID, @WorkProcessID," +
                    $" @Imei, @ProductID, @Quantity, @Standard, @ProductionBatchNo, @GalvanizedOrganization," +
                    $" @SteelPrice, @Vendor, @SteelType, @Width, @Thickness, @Weight1, @Weight2, @Weight3, @Specification," +
                    $" @Note, @Image1, @Image2, @Image3, @Image4, @ParentID, @CreatedBy, @CreatedDate;";
                int rowsAffected3 = await SQLHelper.ExecQueryNonDataAsync(procedureCall3, parameters3);

            }

            return new ApiResponeModel()
            {
                Success = true,
                Data = SteelDefectDetailsID,
                Message = "add Success"
            };
        }
        public async Task<ApiResponeModel> DeleteAllDefectByImei(ProductImeiModel productImei)
        {
            var value = await _steelDefectDetailService.GetAllAsync(c => c.Imei == productImei.Imei);
            if (value != null)
            {
                try
                {
                    await _steelDefectDetailService.DeleteRangeAsync(value);
                    productImei.CreatedDate = DateTime.Now;
                    var mapping = _mapper.Map<ProductImei>(productImei);
                    await _productImei.UpdateAsync(mapping);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Data = productImei,
                        Success = true,
                        Message = "Delete Successfully"
                    };
                }
                catch (Exception ex)
                {
                    return new ApiResponeModel
                    {
                        Data = productImei,
                        Success = false,
                        Message = "There was an error during the data deletion process." + ex.Message
                    };
                }
            }else
            {
                return new ApiResponeModel
                {
                    Data = productImei,
                    Success = false,
                    Message = "ID Not Found"
                };
            }
            
        }

        public async Task<bool> DeleteRangeAsyncDefect(string imei)
        {
            try
            {
                var lsDefects = await _steelDefectDetailService.GetAllAsync(c => c.Imei == imei);
                if (lsDefects.Count == 1)
                {
                    await _steelDefectDetailService.DeleteAsync(lsDefects[0]);
                    await _unitOfWork.SaveChanges();
                }else
                {
                    await _steelDefectDetailService.DeleteRangeAsync(lsDefects);
                    await _unitOfWork.SaveChanges();
                }
            }
            catch(Exception e)
            {
                return false;
            }

            return true;
        }
    }
}


