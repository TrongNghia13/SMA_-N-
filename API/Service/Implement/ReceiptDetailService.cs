using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Service.Implement
{
    public class ReceiptDetailService : IReceiptDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<ReceiptDetail> _receiptDetailService;
        private readonly IMapper _mapper;
        private readonly IRepository<ReceiptImei> _receiptImeiService;
        private readonly IRepository<SteelDefectDetail> _steelDefectDetailService;


        public ReceiptDetailService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _receiptImeiService = _unitOfWork.ReceiptImeiRepository;
            _receiptDetailService = _unitOfWork.ReceiptDetailRepository;
            _steelDefectDetailService = _unitOfWork.SteelDefectDetailRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(ReceiptDetailModel receiptDetailModel)
        {
            var _mapping = _mapper.Map<ReceiptDetail>(receiptDetailModel);
            try
            {
                await _receiptDetailService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = receiptDetailModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = receiptDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, ReceiptDetailModel receiptDetailModel)
        {
            try
            {
                var map = _mapper.Map<ReceiptDetail>(receiptDetailModel);
                if (id != receiptDetailModel.ReceiptDetailID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _receiptDetailService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = receiptDetailModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = receiptDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _receiptDetailService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _receiptDetailService.DeleteAsync(value);
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

        public async Task<IEnumerable<ReceiptDetailModel>> GetAll()
        {
            var listEntity = await _receiptDetailService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<ReceiptDetailModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _receiptDetailService.GetAsync(c => c.ReceiptDetailID == id);
            var entityMapped = _mapper.Map<ReceiptDetailModel>(entity);
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
        public async Task<ApiResponeModel> GetReceiptDetailFull(decimal receiptId)
        {
            try
            {
            var listEntity = await _receiptDetailService.GetAllAsync(c => c.ReceiptID == receiptId);
            var mapList = _mapper.Map<List<ReceiptDetailModel>>(listEntity);
            ReceiptDetailFullModel receiptFull = new ReceiptDetailFullModel();
            List<ReceiptDetailModel> listReceiptDetailModel = new List<ReceiptDetailModel>();
            for (var i = 0; i < mapList.Count; i++)
            {
                //List<ReceiptImeiModel> listModel = new List<ReceiptImeiModel>();
                var listReceiptImei = await _receiptImeiService.GetAllAsync(c => c.ReceiptDetailID == mapList[i].ReceiptDetailID );
                var listReceiptImeiMapped = _mapper.Map<List<ReceiptImeiWithDefectDetail>>(listReceiptImei);
                    listReceiptDetailModel.Add(mapList[i]);
                    receiptFull.listReceiptDetails = listReceiptDetailModel;
                    for(var j = 0; j < listReceiptImeiMapped.Count; j++)
                    {
                        var listDefectDetail = await _steelDefectDetailService.GetAllAsync(c => c.Imei == listReceiptImeiMapped[j].Imei.ToString());
                        if(listDefectDetail != null)
                        {
                            var listDefectDetailMapped = _mapper.Map<List<SteelDefectDetailModel>>(listDefectDetail);
                            listReceiptImeiMapped[j].listSteelDefectDetails = listDefectDetailMapped;
                        }
                    }
                    receiptFull.listReceiptImeis = listReceiptImeiMapped;
                }
                return new ApiResponeModel
                {
                    Data = receiptFull,
                    Message = "",
                    Status = 200,
                    Success = true
                };
            }
            catch
            {
                return new ApiResponeModel
                {
                    Message = "",
                    Status = 0,
                    Success = false
                };
            }
        }

    }
}
