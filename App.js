import React,{useState}  from 'react';

import { StatusBar } from 'expo-status-bar';

import { StyleSheet,
   Text, 
   View,
   TouchableOpacity,
   Clipboard,
   Share,
   Linking,
   SafeAreaView,
  Image,
  ImageBackground,
  Button,} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import react from 'react';
import * as Speech from 'expo-speech';
import AppIntroSlider from 'react-native-app-intro-slider';


// Tts.setDefaultLanguage('en-GB');
// Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
// Tts.setDefaultRate(0.5);
// Tts.setDefaultPitch(1.2);


export default function App() {
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2894773605975425/7643292588';

  // -------intro slids------
  const [showRealApp, setShowRealApp] = useState(false);
 
  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };
 
  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

// ---------intro slids end-----

  const [Quote ,setQuote]=useState('Click New Words...');
  const [Author ,setAuthor]=useState('Waiting for a Click');
  const [isLoading ,setsLoading]=useState(false);

// =----=-=------for random words generator------
  const randomQuat=()=>{
    setsLoading(true);
    fetch("https://api.quotable.io/random").then(res =>res.json()).then(result => {
      // console.log(result.content);
      setQuote(result.content);
      setAuthor(result.author);
      setsLoading(false);

    })
  }
  const speakNow=()=>{
    // Tts.speak(Quote);

  }
  // ---------for copy the text----------
  const copyToClipboard = () => {
    Clipboard.setString(Quote);
  }
  // -----------for voice text to speech-------
  const speak = () => {
    // const thingToSay = '1';
    Speech.speak(Quote +'by'+ Author);
  };
  // -----------for voice text to speech-------
  const insta = () => {
      const url="http://creationoflife.epizy.com/?i=1";
      Linking.openURL(url);
  };
  const feed = () => {
    const url="http://creationoflife.epizy.com/?i=1";
    Linking.openURL(url);
};
  // --------------------for sharing part----------

  
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'This project is still in process so please wait for finish',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
  return (
    <>
    {showRealApp ? (
      
    <View style={styles.container}>
      <StatusBar style="light"/>
      
      <View style={{borderRadius:20,
      padding:20,
      marginVertical:20,
      backgroundColor:'#fff',
      }} >
      <Text style={{textAlign: 'center',
fontSize:20,
fontwidth:'600',
marginBottom:20}}>Search Words for your Mind Peace </Text>


      </View>

      <View style={{width:'90%',backgroundColor:'#fff',borderRadius:20,padding:20}}>
<Text style={{textAlign: 'center',
fontSize:20,
fontwidth:'600',
marginBottom:20}}>Quotes of the day</Text>
<FontAwesome5 name='quote-left' />
<Text style={{marginBottom:20,
textAlign: 'center',
fontSize:16,lineHeight:24,
letterSpacing:1.1,
fontwidth:'400'}}>
 {Quote}
</Text>
<FontAwesome5 name='quote-right' style={{textAlign:'right'}} />

<Text style={{textAlign:'right',
fontweight:'300',
fontStyle:'italic',
fontSize:16,color:'#000'}}>
  ----{Author}
  
</Text>
      <TouchableOpacity onPress={randomQuat} style={{borderRadius:20,
      padding:20,
      marginVertical:20,
      backgroundColor:'#00bfff'}} >
<Text style={{textAlign: 'center',
fontSize:18,
color:'#fff'}}>
{isLoading ? "Loading...":" New Words"}
</Text>
      </TouchableOpacity>

    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
    <TouchableOpacity onPress={speak} style={{borderWidth:2,
    borderColor:'blue',
    borderRadius:58,
    padding:15}}>
<FontAwesome name='volume-up' size={22} color='#5372f0' />
    </TouchableOpacity>
    {/* ----3---- */}
    <TouchableOpacity onPress={copyToClipboard} style={{borderWidth:2,
    borderColor:'blue',
    borderRadius:58,
    padding:15}}>
<FontAwesome name='copy' size={22} color='#5372f0' />
    </TouchableOpacity>
    {/* ---1---- */}
    <TouchableOpacity onPress={onShare} style={{borderWidth:2,
    borderColor:'blue',
    borderRadius:58,
    padding:15}}>
<FontAwesome name='browser' size={22} color='#5372f0' />
    </TouchableOpacity>
    {/* ----2----- */}
    <TouchableOpacity onPress={insta} style={{borderWidth:2,
    borderColor:'blue',
    borderRadius:58,
    padding:15}}>
<FontAwesome name='instagram' size={22} color='#5372f0' />
    </TouchableOpacity>
    
{/* .......first.... */}
    </View>
    
    {/* .......secondbtton..... */}
    <TouchableOpacity onPress={feed} style={{borderRadius:20,
      padding:20,
      marginVertical:20,
      backgroundColor:'#00bfff'}}>

    <Text style={{textAlign: 'center',
fontSize:20,
fontwidth:'600',
marginBottom:20}}>FeedBack</Text>
    </TouchableOpacity>
      </View>
      {/* <BannerAd
      unitId={adUnitId}
      size={BannerAd.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}/> */}
    </View>
    /* -----intro slider start----- */
    ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
    // -----end of slider -----
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3395ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
// -----slider part ------
const slides = [
  {
    key: 's1',
    text: 'to Recharge Your Life ',
    title: 'Words have Power',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Our Words will',
    text: 'Travel like Flights in Your Mind',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  // {
  //   key: 's3',
  //   title: 'Great Offers',
  //   text: 'Enjoy Great offers on our all services',
  //   image: {
  //     uri:
  //       'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
  //   },
  //   backgroundColor: '#22bcb5',
  // },
  {
    key: 's3',
    title: 'Words have power',
    text: ' to Show Who You are and Heal You',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  // {
  //   key: 's5',
  //   title: 'Bus Booking',
  //   text: 'Enjoy Travelling on Bus with flat 100% off',
  //   image: {
  //     uri:
  //       'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
  //   },
  //   backgroundColor: '#f6437b',
  // },
  // {
  //   key: 's6',
  //   title: 'Train Booking',
  //   text: ' 10% off on first Train booking',
  //   image: {
  //     uri:
  //       'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
  //   },
  //   backgroundColor: '#febe29',
  // },
];