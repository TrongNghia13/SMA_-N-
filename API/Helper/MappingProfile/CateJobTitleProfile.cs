using AutoMapper;
using DATA;
using Model;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helper.MappingProfile
{
    public class CateJobTitleProfile : Profile
    {
        public CateJobTitleProfile()
        {

            CreateMap<CateJobTitle, CateJobTitleModel>();
            CreateMap<CateJobTitleModel, CateJobTitle>();

        }
    }
}