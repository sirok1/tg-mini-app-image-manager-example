export class Service {
    static someApiFunction(text: string, imageFile: File | undefined) {
        //use axios here
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(text, imageFile)
                resolve(true)
            }, 1500)
        })

    }
}