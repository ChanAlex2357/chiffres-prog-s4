using System.Reflection;

namespace ChiffresApi.Models
{
    public class Timer {
        public int hours;
        public int minutes;
        public int secondes;

        public Timer(int hr , int min , int secs){
            this.hours = hr;
            this.minutes = min;
            this.secondes = secs;
        }
    }
}