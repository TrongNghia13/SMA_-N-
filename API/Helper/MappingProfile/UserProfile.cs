
using AutoMapper;
using DATA;
using Model.Models;

namespace Helper
{
	public class UserProfile : Profile
	{
		public UserProfile() {

			CreateMap<User, UserModel>();
			CreateMap<UserModel, User>();

		}

	}
}