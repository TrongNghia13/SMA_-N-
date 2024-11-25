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
    public class CateSteelDefectService : ICateSteelDefect
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateSteelDefect> _cateSteelDefect;
        private readonly IMapper _mapper;

        public CateSteelDefectService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateSteelDefect = _unitOfWork.CateSteelDefectRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateSteelDefectModel cateSteelDefectModel)
        {
            var _mapping = _mapper.Map<CateSteelDefect>(cateSteelDefectModel);
            try
            {
                await _cateSteelDefect.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateSteelDefectModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateSteelDefectModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(int id, CateSteelDefectModel cateSteelDefectModel)
        {
            try
            {
                var map = _mapper.Map<CateSteelDefect>(cateSteelDefectModel);
                if (id != cateSteelDefectModel.SteelDefectID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateSteelDefect.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateSteelDefectModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateSteelDefectModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _cateSteelDefect.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateSteelDefect.DeleteAsync(value);
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

        public async Task<IEnumerable<CateSteelDefectModel>> GetAll()
        {
            var listEntity = await _cateSteelDefect.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateSteelDefectModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _cateSteelDefect.GetAsync(c => c.SteelDefectID == id);
            var entityMapped = _mapper.Map<CateSteelDefectModel>(entity);
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
        public async Task<IEnumerable<CateSteelDefectModel>> GetAllRollDefect()
        {
            var listEntity = await _cateSteelDefect.GetAllAsync(c => c.Material.Contains("C"));
            var mapList = _mapper.Map<IEnumerable<CateSteelDefectModel>>(listEntity);
            return mapList;
        }
        public async Task<IEnumerable<CateSteelDefectModel>> GetAllTapeDefect()
        {
            var listEntity = await _cateSteelDefect.GetAllAsync(c => c.Material.Contains("B"));
            var mapList = _mapper.Map<IEnumerable<CateSteelDefectModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetListDefectByMarterialType(string marterialType)
        {
            List<ListCateSteelDefect> listDefect = new List<ListCateSteelDefect>();
            try
            {
                var listEntity = await _cateSteelDefect.GetAllAsync(c => c.Material! == marterialType && c.DefectType == "MAIN");
                for (int i = 0; i < listEntity.Count; i++)
                {
                    var listOption1 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION1");
                    var listOption2 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION2");
                    var listOption3 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION3");
                    var listOption4 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION4");
                    List<ListCateSteelDefect> mapOption1 = new List<ListCateSteelDefect>();
                    List<ListCateSteelDefect> mapOption2 = new List<ListCateSteelDefect>();
                    List<ListCateSteelDefect> mapOption3 = new List<ListCateSteelDefect>();
                    List<ListCateSteelDefect> mapOption4 = new List<ListCateSteelDefect>();
                    for (var n = 0; n < listOption1.Count; n++)
                    {
                        mapOption1.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption1[n].DefectName,
                            Material = listOption1[n].Material,
                            SteelDefectID = listOption1[n].SteelDefectID
                        });
                    }
                    for (var g = 0; g < listOption2.Count; g++)
                    {
                        mapOption2.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption2[g].DefectName,
                            Material = listOption2[g].Material,
                            SteelDefectID = listOption2[g].SteelDefectID
                        });
                    }
                    for (var u = 0; u < listOption3.Count; u++)
                    {
                        mapOption3.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption3[u].DefectName,
                            Material = listOption3[u].Material,
                            SteelDefectID = listOption3[u].SteelDefectID
                        });
                    }
                    for (var y = 0; y < listOption4.Count; y++)
                    {
                        mapOption4.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption4[y].DefectName,
                            Material = listOption4[y].Material,
                            SteelDefectID = listOption4[y].SteelDefectID
                        });
                    }
                    listDefect.Add(new ListCateSteelDefect
                    {
                        DefectName = listEntity[i].DefectName,
                        Material = listEntity[i].Material,
                        SteelDefectID = listEntity[i].SteelDefectID,
                        Option1 = mapOption1,
                        Option2 = mapOption2,
                        Option3 = mapOption3,
                        Option4 = mapOption4,
                    });
                }
                return new ApiResponeModel
                {
                    Success = true,
                    Status = 200,
                    Data = listDefect,
                    Message = ""
                };
            }
            catch
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Status = 0,
                    Data = listDefect,
                    Message = ""
                };
            }
        }
        public async Task<ApiResponeModel> GetAllListDefect()
        {
            List<ListCateSteelDefect> listDefect = new List<ListCateSteelDefect>();
            try
            {
                var listEntity = await _cateSteelDefect.GetAllAsync(c => c.DefectType == "MAIN");
                for (int i = 0; i < listEntity.Count; i++)
                {
                    var listOption1 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION1");
                    var listOption2 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION2");
                    var listOption3 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION3");
                    var listOption4 = await _cateSteelDefect.GetAllAsync(c => c.ParentID == listEntity[i].SteelDefectID && c.DefectType == "OPTION4");
                    List<ListCateSteelDefect> mapOption1 = new List<ListCateSteelDefect>();
                    List<ListCateSteelDefect> mapOption2 = new List<ListCateSteelDefect>();
                    List<ListCateSteelDefect> mapOption3 = new List<ListCateSteelDefect>();
                    List<ListCateSteelDefect> mapOption4 = new List<ListCateSteelDefect>();
                    for (var n = 0; n < listOption1.Count; n++)
                    {
                        mapOption1.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption1[n].DefectName,
                            Material = listOption1[n].Material,
                            SteelDefectID = listOption1[n].SteelDefectID
                        });
                    }
                    for (var g = 0; g < listOption2.Count; g++)
                    {
                        mapOption2.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption2[g].DefectName,
                            Material = listOption2[g].Material,
                            SteelDefectID = listOption2[g].SteelDefectID
                        });
                    }
                    for (var u = 0; u < listOption3.Count; u++)
                    {
                        mapOption3.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption3[u].DefectName,
                            Material = listOption3[u].Material,
                            SteelDefectID = listOption3[u].SteelDefectID
                        });
                    }
                    for (var y = 0; y < listOption4.Count; y++)
                    {
                        mapOption4.Add(new ListCateSteelDefect
                        {
                            DefectName = listOption4[y].DefectName,
                            Material = listOption4[y].Material,
                            SteelDefectID = listOption4[y].SteelDefectID
                        });
                    }
                    listDefect.Add(new ListCateSteelDefect
                    {
                        DefectName = listEntity[i].DefectName,
                        Material = listEntity[i].Material,
                        SteelDefectID = listEntity[i].SteelDefectID,
                        Option1 = mapOption1,
                        Option2 = mapOption2,
                        Option3 = mapOption3,
                        Option4 = mapOption4,
                    });
                }
                return new ApiResponeModel
                {
                    Success = true,
                    Status = 200,
                    Data = listDefect,
                    Message = ""
                };
            }
            catch
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Status = 0,
                    Data = listDefect,
                    Message = ""
                };
            }
        }
    }
}
