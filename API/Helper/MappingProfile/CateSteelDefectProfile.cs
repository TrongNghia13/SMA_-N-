﻿using AutoMapper;
using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helper.MappingProfile
{
    public class CateSteelDefectProfile : Profile
    {
        public CateSteelDefectProfile()
        {
            CreateMap<CateSteelDefect, CateSteelDefectModel>();
            CreateMap<CateSteelDefectModel, CateSteelDefect>();
        }
    }
}
