using System;
using Microsoft.Extensions.Hosting;
using Availity;
using Xunit;
using Moq;

namespace AvailityUnitTest
{
    public class ProgramTest
    {
        private Mock<IHostBuilder> mockHostBuilder;
        public ProgramTest()
        {
            mockHostBuilder = new Mock<IHostBuilder>();
        }
        [Fact]
        public void CreateHostBuilderTest()
        {
            var args = new string[] { "UnitTest" };
            var webHost = Program.CreateHostBuilder(args);
            Assert.NotNull(webHost);
        }
        [Fact]
        public void MainTest()
        {
            var args = new string[] { "Unit Test" };
            dynamic result = null;
            try
            {
                Program.Main(args);
            }
            catch (Exception e)
            {
                result = e;
            }
            Assert.NotNull(result);
        }
    }
}
