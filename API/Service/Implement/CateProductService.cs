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

namespace Service.Implement
{
    public class CateProductService : ICateProduct
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateProduct> _cateProductService;
        private readonly IMapper _mapper;
        public CateProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateProductService = _unitOfWork.CateProductRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateProductModel cateProductModel)
        {
            var _mapping = _mapper.Map<CateProduct>(cateProductModel);
            try
            {
                await _cateProductService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateProductModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateProductModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateProductModel cateProductModel)
        {
            try
            {
                var map = _mapper.Map<CateProduct>(cateProductModel);
                if (id != cateProductModel.ProductID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateProductService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateProductModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateProductModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateProductService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateProductService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateProductModel>> GetAll()
        {
            var listEntity = await _cateProductService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateProductModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateProductService.GetAsync(id);
            var entityMapped = _mapper.Map<CateProductModel>(entity);
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
        public async Task<IEnumerable<CateProductModel>> GetListCateProduct(CateProductModel cateProductModel)
        {
            var listEntity = new List<CateProduct>();
            if (cateProductModel.MenuKey != null && cateProductModel.MenuKey == "Nhapnl_cuon"
                || cateProductModel.MenuKey == "outputInventory"
                || cateProductModel.MenuKey == "inputRollInventory"
                || cateProductModel.MenuKey == "outputRollInventory"
                )
            {
                var value = await _cateProductService.GetAsync(c => c.ProductTypeId == "CUN");
                listEntity.Add(value);
            }
            else if (cateProductModel.MenuKey != null && cateProductModel.MenuKey == "inputTapeFormProduction")
            {
                var value = await _cateProductService.GetAsync(c => c.ProductTypeId == "BAG");
                listEntity.Add(value);
            }
            else
            {
                var EntityList = await _cateProductService.GetAllAsync();
                if (cateProductModel.ProductTypeID != null && cateProductModel.ProductTypeID.Length > 0)
                {
                    EntityList = EntityList.Where(c => c.ProductTypeId == cateProductModel.ProductTypeID).ToList();
                }
                listEntity.AddRange(EntityList);
            }
            var mapList = _mapper.Map<IEnumerable<CateProductModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetAutoProductID(CateProductTypeModel model)
        {
            string productIDString = "";
            if (model != null)
            {
                if (model.ProductTypeID != null && model.ProductTypeID.Length > 0)
                {
                    if (model.IsPrefix != null && model.IsPrefix == true)
                    {
                        productIDString = model.ProductTypeID + "-";
                    }
                    if (model.IsAutoPutId != null && model.IsAutoPutId == true)
                    {
                        var listEntity = await _cateProductService.GetAllAsync(c => c.ProductTypeId == model.ProductTypeID);
                        if (listEntity != null)
                        {
                            productIDString += ("-" + listEntity.Count);
                        }
                    }
                }

            }
            return new ApiResponeModel
            {
                Data = productIDString,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}

