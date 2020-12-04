import React from "react"
import {Text,View,TouchableOpacity,Image} from react-native
import {Card} from 'react-native-elements'
import axios from 'axios'
import {RFValue} from 'react-native-responsive-fontsize'

export default class PopularArticleScreen extends React.Component{
    constructor(){
        super()
        this.state={data:[]}
    }  
    componentDidMount(){
        this.getdata()
    }
    timeconvert(num){
        var hours=Math.float(num/60)
        var minutes=num%60
        return `${hours} hrs ${minutes} mins`
    }
    getdata=()=>{
        const url='http://localhost:5000/popular-articles'
        axios
        .get(url)
        .then(async response=>{
            this.setState({data:response.data.data})
        })
        .catch(error=>{console.log(error.message)})

    }
    keyExtractor=(item,index)=>index.toString()
    renderItems=({item,index})=>{
        return (
            <Card
              key={`card-${index}`}
              image={{ uri: item.poster_link }}
              imageProps={{ resizeMode: "cover" }}
              featuredTitle={item.title}
              featuredSubtitle={`${
                item.release_date.split("-")[0]
              } | ${this.timeConvert(item.duration)}`}
            ></Card>
          );
        };
      
        render() {
          const { data } = this.state;
          return (
            <View >
              <FlatList
                data={data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItems}
              />
            </View>
          );
    }
}
