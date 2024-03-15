#include <iostream>
#include <string>
using namespace std;

int main() {
    int i=1;
    string name="garima";
    while (sha256(name).substr(0,4)!="0000") {
      name+=to_string(i);
      i++;
    }
    cout<<i-1<<endl;
    return 0;
}