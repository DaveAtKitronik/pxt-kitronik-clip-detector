//On detection the micro:bit screen will switch between a happy and sad face
basic.forever(function () {
    if (Kitronik_Clip_Detector.sensorDigitalDetection(Kitronik_Clip_Detector.PinSelection.P0, Kitronik_Clip_Detector.LightSelection.Dark)) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})