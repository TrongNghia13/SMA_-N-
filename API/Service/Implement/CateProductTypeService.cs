using AutoMapper;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using DATA;
using DATA.Infastructure;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class CateProductTypeService : ICateProductTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateProductType> _cateProductTypeService;
        private readonly IMapper _mapper;
        public CateProductTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateProductTypeService = _unitOfWork.CateProductTypeRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateProductTypeModel pdtModel)
        {
            var _mapping = _mapper.Map<CateProductType>(pdtModel);
            try
            {
                await _cateProductTypeService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = pdtModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = pdtModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateProductTypeModel pdtModel)
        {
            try
            {
                var map = _mapper.Map<CateProductType>(pdtModel);
                if (id != pdtModel.ProductTypeID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateProductTypeService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = pdtModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = pdtModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateProductTypeService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateProductTypeService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateProductTypeModel>> GetAll()
        {
            var listEntity = await _cateProductTypeService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateProductTypeModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateProductTypeService.GetAsync(id);
            var entityMapped = _mapper.Map<CateProductTypeModel>(entity);
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
        public async Task<ApiResponeModel> GetTreeGrid()
        {
            var entity = await _cateProductTypeService.GetAllAsync();
            List<CateProductTypeTreeModel> list = new List<CateProductTypeTreeModel>();
            CateProductTypeTreeModel cate = new CateProductTypeTreeModel();
            cate.Key = "ALL";
            cate.ProductTypeID = "ALL";
            cate.IsPrefix = false;
            cate.Length = 0;
            cate.IsAutoPutId = false;
            cate.ParentID = "";
            cate.Children = FindProductTypeShowTree(entity, "ALL");
            list.Add(cate);
            if (list == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = list,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        private List<CateProductTypeTreeModel> FindProductTypeShowTree(List<CateProductType>? lstProductType, string ParentID)
        {
            List<CateProductTypeTreeModel> treeProductType = new List<CateProductTypeTreeModel>();
            var ProductTypeByParentID = lstProductType.Where(p => p.ParentID == ParentID).ToList();
            if (ProductTypeByParentID != null)
            {
                if (ProductTypeByParentID.Count() > 0)
                {

                    foreach (var item in ProductTypeByParentID)
                    {
                        CateProductTypeTreeModel itemTree = new CateProductTypeTreeModel
                        {
                            Key = item.ProductTypeID,
                            ProductTypeID = item.ProductTypeID,
                            ProductTypeName = item.ProductTypeName,
                            IsPrefix = item.IsPrefix,
                            Length = item.Length,
                            IsAutoPutId = item.IsAutoPutID,
                            ParentID = item.ParentID,
                            Children = FindProductTypeShowTree(lstProductType, item.ProductTypeID)
                        };
                        treeProductType.Add(itemTree);
                    }
                }
            }
            return treeProductType;
        }
        public async Task<ApiResponeModel> GetDataShowTreeSelect()
        {
            var entity = await _cateProductTypeService.GetAllAsync();
            List<TreeData> list = new List<TreeData>();
            list = FindProductTypeByProductTypeIDShowTreeSelect(entity, "ALL");
            if (list == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = list,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        private List<TreeData> FindProductTypeByProductTypeIDShowTreeSelect(IEnumerable<CateProductType> lstProductType, string ProductTypeID)
        {
            List<TreeData> treeProductType = new List<TreeData>();
            var ProductTypeByProductTypeID = lstProductType.Where(p => p.ParentID == ProductTypeID).ToList();
            if (ProductTypeByProductTypeID != null)
            {
                if (ProductTypeByProductTypeID.Count() > 0)
                {

                    foreach (var item in ProductTypeByProductTypeID)
                    {
                        TreeData itemTree = new TreeData
                        {
                            Key = item.ProductTypeID,
                            Value = item.ProductTypeID,
                            Title = item.ProductTypeName ?? "",
                            AttrData = JsonSerializer.Serialize(
                                new
                                {
                                    item.IsAutoPutID,
                                    item.Length,
                                    item.IsPrefix
                                }
                            ),
                            Children = FindProductTypeByProductTypeIDShowTreeSelect(lstProductType, item.ProductTypeID)
                        };
                        treeProductType.Add(itemTree);
                    }
                }
            }
            return treeProductType;
        }
       
    }
}
