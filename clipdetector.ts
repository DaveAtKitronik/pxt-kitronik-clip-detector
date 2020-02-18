/**
 * Kitronik Clip Detector blocks
 **/
//% weight=100 color=#00A654 icon="\uf29d" block="Clip Detector"
namespace Kitronik_Clip_Detector {
    //micro:bit pin selections
    export enum PinSelection {
        //% block="P0"
        P0,
        //% block="P1"
        P1,
        //% block="P2"
        P2
    }

    //Light level detection mode selection
    export enum LightSelection {
        //% block="Light"
        Light,
        //% block="Dark"
        Dark,
        //% block = "Object"
        Object
    }

        //Detection mode selection
    export enum DetectorSensitivity {
        //% block="Low"
        Low,
        //% block="Medium"
        Medium,
        //% block="High"
        High
    }

    //Global variables and setting default values
    let detectionLevel = 400 //good compromise based on tests for 'dark things' vs 'light things'

    /**
    * @param setupSelected is the selection of how the sensors are setup
    */
    //% blockId=kitronik_clip_dectector_setup
    //% block="set sensors to %setupSelected| sensitivity"
    //% weight=60 blockGap=8
    export function sensorSetup(setupSelected: DetectorSensitivity) 
    {
        switch(setupSelected)
        {
            case DetectorSensitivity.Low: 
            detectionLevel =500
            break
            case DetectorSensitivity.Medium: 
            detectionLevel =400
            break
            case DetectorSensitivity.High: 
            detectionLevel =300
            break
        }
    }
    
    /**
    * Set the sensor sensitivity value for detection of objects. 
    * Assumes that the sensors will normally be pointing at free space.
    * @param none
    */
    //% blockId=kitronik_clip_dectector_object_detect
    //% block=setup sensors for object detection"
    //% weight=50    blockGap=8
    export function setSensorToDetectObjects()
    {
        detectionLevel =100
    }

    /**
    * Read sensor block allows user to read the value of the sensor (returns value in range 0-1023)
    * @param pinSelected is the selection of pin to read a particular sensor
    */
    //% blockId=kitronik_clip_dectector_read_sensor
    //% block="read sensor on pin %pinSelected"
    //% weight=90 blockGap=8
    export function readSensor(pinSelected: PinSelection) {
        let value = 0
        switch (pinSelected)
        {
            case PinSelection.P0:
            value = pins.analogReadPin(AnalogPin.P0)
            break
            case PinSelection.P1:
            value = pins.analogReadPin(AnalogPin.P1)
            break
            case PinSelection.P2:
            value = pins.analogReadPin(AnalogPin.P2)
            break
        }
        return value;
    }
    

    /**
    * Sensor on pin detection returns a true or false when the sensor has detected
    * @param pinSelected is the selection of pin to read a particular sensor
    * @param lightSelection is the selection of the sensor detecting light or dark
    */
    //% blockId=kitronik_clip_dectector_digital_sensor
    //% block="sensor on pin %pinSelected| detects %LightSelection"
    //% weight=95 blockGap=8
    export function sensorDigitalDetection(pinSelected: PinSelection, lightLevel: LightSelection): boolean{
        let value = 0
        let result = false
        value = readSensor(pinSelected)
        switch (lightLevel)
        {
            case LightSelection.Object:
            case LightSelection.Light:  //Light and Object are the same - but called out differently for ease of use.
            {
                if (value >= detectionLevel){
                    result = true
                }
                else { 
                    result = false
                }
            }
            break
            case LightSelection.Dark:
            {
                if (value <= detectionLevel)
                {
                    result = true
                }
                else { 
                    result = false
                }
            }
            break
        }
        return result;
    }
} 