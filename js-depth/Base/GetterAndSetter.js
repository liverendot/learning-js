
//定义单个属性
function DefineSingleProperty()
{
    let book = {
        year_ : 2017,
        edition : 1
    };

    Object.defineProperty(book,"year",{
        //Getter
        get(){
            return this.year_;
        },

        //Setter
        set(newValue){
            if(newValue>2017){
                this.year_ = newValue;
                this.edition += newValue-2017;
            }
        }
    });

    console.log(book.year_);
    console.log(book.edition);
    //book.year_ = 2019
    book.year=2019;
    console.log(book.year_);
    console.log(book.edition);
}
//DefineSingleProperty();

//定义多个属性
function DefineMultiProperty()
{
    let book={};
    Object.defineProperties(book,{
        year_:{
            value:2017
        },

        edition:{
            value:1
        },

        year:{
            get(){
                return this.year_;
            },
            set(newValue){
                if(newValue>2017)
                {
                    this.year_=newValue;
                    this.edition += newValue-2017;
                }
            }
        }
    });

    /* console.log(book.year_);
    //book.year_ = 2019; //Exception , writable is false;
    book.year = 2019;   //Exception, properties "year_","edition" are false
    console.log(book.year);
    console.log(book.edition); */

    let descriptor = Object.getOwnPropertyDescriptor(book,"year_");
    console.log(descriptor);
    descriptor = Object.getOwnPropertyDescriptor(book,"year");
    console.log(descriptor);
}
DefineMultiProperty();