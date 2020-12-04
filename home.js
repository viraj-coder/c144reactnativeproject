import React from "react"
import {Text,View,TouchableOpacity,Image} from react-native
export default class Home extends React.Component{
    constructor(){
        super()
        this.state={articledetails:{}}
    }   
    getarticle=()=>{
    const url="http://127.0.0.1/5000/get-movie"//use api from ngork
    axios.get(url).then(responce=>{let details=responce.data.data
    details["duration"]=this.timeconvert(details.duration)
    this.setState({articledetails:details})
          })
    .catch(error=>{console.log(error.message)})
    }
componentDidMount(){this.getarticle()}
likedarticle=()=>{const url="http://127.0.0.1/5000/liked-article"
axios.post(url).then(responce=>{this.getmovie()})
.catch(error=>{console.log(error.message)})}

unlikedarticle=()=>{
const url="http://127.0.0.1/5000/unliked-article"
axios.post(url).then(responce=>{this.getmovie()})
.catch(error=>{console.log(error.message)})
}
didnotseearticle=()=>{
const url="http://127.0.0.1/5000/get-movie"
axios.post(url).then(responce=>{this.getarticle()})
.catch(error=>{console.log(error.message)})

}
timeconvert(num){
    var hours=Math.float(num/60)
    var minutes=num%60
    return `${hours} hrs ${minutes} mins`
}
render(){
    const {articledetails}=this.state
    if (articledetails.poster_link){
        const{poster_link,title,release_data,duration,overview,rating}=moviedetails
        return(
            <View style={styles.container}>
                <View style={styles.headercontainer}>
                <Header centerComponent={{text:"Article Recommended",style=styles.headertitle}}
                rightComponent={{icon:"search",color:"#fff"}}
                backgroundcolor={"#df009"}
                containerStyle={{flex:1}}/>
                </View>
                <View>
                    <Image source={{uri:poster_link}}>

                    </Image>
                </View>
                <View>
                    <Text>
                        {title}
                    </Text>
                    <Text>
                        {`${release_date.split('-')[0]}`} | ${duration}
                    </Text>
                </View>
                <View>
                    <AirbnbRating
                    count={10}
                    reviews={['','','','','']}
                    defaultRating={rating}
                    isDisabled={True}
                    size={RFValue(25)}
                    >

                    </AirbnbRating>
                </View>
                <View>
                    <Text>
                    {overview}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                    onPress={this.likedarticle}
                    >
                        <Icon
                        reverse
                        name={'check'}
                        type={'entypo'}
                        size={RFValue(30)}
                        color={'green'}
                        >

                        </Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={this.unlikedmovie}
                    >
                        <Icon
                        reverse
                        name={'cross'}
                        type={'entypo'}
                        size={RFValue(30)}
                        color={'red'}
                        >

                        </Icon>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            onPress={this.didnotseearticle}
                            >
                                <Text>
                                    Did Not Watch
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                

        )
    }
}
}     
    
