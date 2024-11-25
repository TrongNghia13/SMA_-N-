using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;
using System.Text.Json;

namespace Service.Implement
{
    public class RoleReportService : IRoleReportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<RoleReport> _roleReportRepository;
        private readonly IRepository<Role> _roleRepository;
        private readonly IRepository<Report> _reportRepository;
        private readonly IRepository<ReportGroup> _reportGroupRepository;

        private readonly IMapper _mapper;

        public RoleReportService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _roleReportRepository = _unitOfWork.RoleReportRepository;
            _roleRepository = _unitOfWork.RoleRepository;
            _reportRepository = _unitOfWork.ReportRepository;
            _reportGroupRepository = _unitOfWork.ReportGroupRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(RoleReportModel roleReportModel)
        {
            var _mapping = _mapper.Map<RoleReport>(roleReportModel);
            try
            {
                await _roleReportRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = roleReportModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = roleReportModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(int id, RoleReportModel roleReportModel)
        {
            try
            {
                var map = _mapper.Map<RoleReport>(roleReportModel);
                if (id != roleReportModel.RoleReportID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _roleReportRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = roleReportModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = roleReportModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _roleReportRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _roleReportRepository.DeleteAsync(value);
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

        public async Task<IEnumerable<RoleReportModel>> GetAll()
        {
            var listEntity = await _roleReportRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<RoleReportModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _roleReportRepository.GetAsync(c => c.RoleReportID == id);
            var entityMapped = _mapper.Map<RoleReportModel>(entity);
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

        public async Task<ApiResponeModel> TreeReportByRole(int id)
        {
            var treReport = new List<TreeData>();

            var roleItem = await _roleRepository.GetAsync(id);
            var ListNhomBaoCao = await _reportGroupRepository.GetAllAsync();
            var ListBaoCao = await _reportRepository.GetAllAsync();
            var listRoleReportRaw = await _roleReportRepository.GetAllAsync(c=>c.RoleID == id);
            var listRoleReport = _mapper.Map<List<RoleReportModel>>(listRoleReportRaw);
            for(int i = 0; i< listRoleReport.Count(); i++)
            {
                var entityReport = await _reportRepository.GetAsync(c => c.ReportId == listRoleReport[i].ReportID);
                listRoleReport[i].ReportName = entityReport.ReportName;
                listRoleReport[i].RoleName = roleItem.RoleName;
            }
            if (ListNhomBaoCao != null)
            {
                foreach (var item in ListNhomBaoCao)
                {
                    int countCheckChild = 0;
                    if (listRoleReport != null)
                    {
                        var listBaoCaoByNhom = ListBaoCao.Where(p => p.ReportGroupId == item.ReportGroupId).ToList();
                        if (listBaoCaoByNhom.Count > 0)
                        {
                            TreeData treeGroupReport = new TreeData
                            {
                                Key = item.ReportGroupId.ToString(),
                                Value = item.ReportGroupId.ToString(),
                                Title = item.ReportGroupName,
                                AttrData = "",
                                CheckState = "",
                                Children = new List<TreeData>()
                            };
                            foreach (var itemReport in listBaoCaoByNhom)
                            {
                                var itemRoleReport = listRoleReport != null ? listRoleReport.FirstOrDefault(p => p.ReportID == itemReport.ReportId) : new RoleReportModel();
                                itemRoleReport = itemRoleReport == null ? new RoleReportModel()
                                {
                                    RoleReportID = 0,
                                    RoleID = id,
                                    ReportID = itemReport.ReportId,
                                    ReportName = "",
                                    RoleName = ""

                                } : itemRoleReport;

                                TreeData treeReport = new TreeData
                                {
                                    Key = itemReport.ReportId.ToString(),
                                    Value = itemReport.ReportId.ToString(),
                                    Title = itemReport.ReportName,
                                    AttrData = JsonSerializer.Serialize(itemRoleReport),
                                    CheckState = itemRoleReport.RoleReportID > 0 ? "checked" : "",
                                    Children = new List<TreeData>()
                                };
                                if (!string.IsNullOrEmpty(treeReport.CheckState)) countCheckChild = countCheckChild + 1;
                                treeGroupReport.Children.Add(treeReport);
                            }
                            if (countCheckChild > 0)
                            {
                                treeGroupReport.CheckState = countCheckChild == treeGroupReport.Children.Count() ? "checked" : "indeterminate";
                            }
                            treReport.Add(treeGroupReport);
                        }
                    }
                }
            }
            if (treReport == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = treReport,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<ApiResponeModel> RoleReportManagerByList(List<RoleReport> listRole)
        {
            if (listRole != null)
            {
                var listOldRole = await _roleReportRepository.GetAllAsync(c => c.RoleID == listRole[0].RoleID);
                if (listOldRole != null)
                {
                    await _roleReportRepository.DeleteRangeAsync(listOldRole);
                    await _roleReportRepository.CreateRangeAsync(listRole);
                    await _unitOfWork.SaveChanges();

                }
            }
            if (listRole == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = listRole,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}


