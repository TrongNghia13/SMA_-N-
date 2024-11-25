using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using static System.Net.Mime.MediaTypeNames;

namespace Helper
{
    internal class DatabaseConfig
    {

        public static string CONNECT_STRING_SQLITE = "";
        public static string IP_SERVER_NAME = "";
        public static string USERNAME_DB = "";
        public static string PASSWORD_DB = "";
        public static string DATABASE = "";
        public static int TIME_OUT = 3;
        public static bool IS_CONNECTED = true;
        public static string CONNECTION_STRINGS = "";
        public enum LOGIN_STATUS
        {
            LOGGINED,
            LOCKED,
            UN_LOGGIN,
        }

        public static string ConnectString()
        {
            CONNECTION_STRINGS = "Data Source=cuahangkinhdoanh.com;User Id=sma;Password=@Sep490g7;Initial Catalog=SMA;Integrated Security=False;MultipleActiveResultSets=True";
            return CONNECTION_STRINGS;
        }

        public static bool CheckConnectionString(string connnection_string)
        {
            try
            {
                SqlConnection conn = new SqlConnection(connnection_string);
                conn.Open();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static string GetSerialHDD()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT * FROM Win32_DiskDrive");


            foreach (ManagementObject wmi_HD in searcher.Get())
            {
                return wmi_HD["SerialNumber"].ToString();
            }
            return null;
        }
    }
}
