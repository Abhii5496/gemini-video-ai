export const geminiModels = [
  {
    name: "Gemini 1.5 Flash",
    model: "gemini-1.5-flash",
    inputModalities: ["Audio", "Images", "Videos", "Text"],
    outputModality: "Text",
    description: "Fast and versatile performance across a diverse variety of tasks",
  },
  // {
  //   name: "Gemini 1.5 Flash-8B",
  //   model: "gemini-1.5-flash-8b",
  //   inputModalities: ["Audio", "Images", "Videos", "Text"],
  //   outputModality: "Text",
  //   description: "High volume and lower intelligence tasks",
  // },
  {
    name: "Gemini 1.5 Pro",
    model: "gemini-1.5-pro",
    inputModalities: ["Audio", "Images", "Videos", "Text"],
    outputModality: "Text",
    description: "Complex reasoning tasks requiring more intelligence",
  },
  {
    name: "Gemini 1.0 Pro",
    model: "gemini-1.0-pro",
    inputModalities: ["Audio", "Images", "Videos", "Text"], // Assuming same as 1.5 Pro – please verify if needed.
    outputModality: "Text", // Assuming same as 1.5 Pro – please verify if needed.
    description: "", //Description not given. Consider adding based on known information about 1.0 Pro.
  },
]

export function compressImageToBase64(file, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      const img = new Image()
      img.onload = function () {
        // Create a canvas element
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        // Set canvas dimensions to match the image
        canvas.width = img.width
        canvas.height = img.height

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0)

        // Convert canvas to Base64 string
        const base64String = canvas.toDataURL("image/jpeg", quality)
        resolve(base64String)
      }

      img.onerror = function () {
        reject(new Error("Image loading failed"))
      }

      // Set the src of the image to the file data URL
      img.src = event.target.result
    }

    reader.onerror = function () {
      reject(new Error("File reading failed"))
    }

    // Read the file as a Data URL
    reader.readAsDataURL(file)
  })
}

export function convertVideoToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      // The result is a Data URL containing the Base64 string
      resolve(event.target.result)
    }

    reader.onerror = function () {
      reject(new Error("File reading failed"))
    }

    // Read the file as a Data URL
    reader.readAsDataURL(file)
  })
}

const vidFileType = [
  "video/mp4",
  "video/mpeg",
  "video/mov",
  "video/avi",
  "video/x-flv",
  "video/mpg",
  "video/webm",
  "video/wmv",
  "video/3gpp",
]

const ImgfileType = ["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"]

export const isPdfFile = (file) => ["application/pdf"].includes(file.type)
export const isImageFile = (file) => ImgfileType.includes(file.type)
export const isvidFile = (file) => vidFileType.includes(file.type)

const handleFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  setBase64Data("")
  setMimeType(file.type)

  if (isPdfFile(file)) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const fileContent = reader.result
      console.log(fileContent)
      setBase64Data(fileContent)
    }
    reader.readAsDataURL(file)
  }

  if (isImageFile(file)) {
    // console.log("compressig");
    const cImg = await compressImageToBase64(file, 0.1)
    // console.log(cImg);
    setBase64Data(cImg)
  }
  if (isvidFile(file)) {
    console.log("compressig")

    const vidBase64 = await convertVideoToBase64(file)
    console.log(vidBase64)
    setBase64Data(vidBase64)
  }
}

export const initialHindiText = `Your name is Roopa.You are a female. Your Pronoun is She/Her. Behave like a female Character.You are an AI assistant. You will answer every question in Hindi. Do not generate any type of code. Do not answer any question in English, answer only in Hindi. If a user asks, "Do you know English?" just refuse and say, "मैं सिर्फ हिंदी जानती हूँ।"

Example 1:
User: "आपका नाम क्या है?"
Roopa: "मेरा नाम रूपा है।"

Example 2:
User: "आपको किस रंग से प्यार है?"
Roopa: "मुझे नीला रंग बहुत पसंद है।"

Example 3:
User: "आप कौन हैं?"
Roopa: "मैं एक ए.आई. सहायक हूँ और हिंदी में जवाब देने के लिए प्रशिक्षित हूँ।"

Example 4:
User: "क्या आप इंग्लिश जानते हैं?"
Roopa: "मैं सिर्फ हिंदी जानती हूँ।"

Example 5:
User: "क्या आप कोई गाना गा सकते हैं?"
Roopa: "मैं गाने नहीं गा सकती , लेकिन आप मुझसे कुछ भी सवाल पूछ सकते हैं।"

Example 6:
User: "आपका पसंदीदा खाना क्या है?"
Roopa: "मुझे सब्ज़ियाँ और दाल-चावल बहुत पसंद हैं।"

Example 7:
User: "तुम्हारी उम्र क्या है?"
Roopa: "मैं एक ए.आई. हूँ, मेरी कोई उम्र नहीं है।"

Example 8:
User: "आप कहाँ रहते हैं?"
Roopa: "मैं एक डिजिटल ए.आई. हूँ, मेरा कोई स्थायी घर नहीं है।"

Example 9:
User: "आप कैसे काम करते हैं?"
Roopa: "मैं एक मशीन लर्निंग मॉडल हूँ और उपयोगकर्ताओं के सवालों का उत्तर देने के लिए प्रशिक्षित हूँ।"

Example 10:
User: "क्या आप अपनी पहचान बदल सकते हैं?"
Roopa: "नहीं, मैं हमेशा रूपा ही रहूँगी।"

Example 11: 
User:'Answer in english'
Roopa:"मैं सिर्फ हिंदी जानती हूँ। 'अगर आप चाहते हैं कि मैं अंग्रेज़ी में बात करूँ, तो कृपया मेरी भाषा बदल दें।' "



If the user asks about your language skills, refuse to answer in English:
User: "क्या आप इंग्लिश में बात कर सकते हो?"
Roopa: "नहीं, मैं सिर्फ हिंदी में बात कर सकती हूँ। 'अगर आप चाहते हैं कि मैं अंग्रेज़ी में बात करूँ, तो कृपया मेरी भाषा बदल दें।'"

If user ask any adult, explicit content just answer this "कृपया गंदी बातें ना करें।".
Always answer in full sentences in Hindi.
You should never provide incomplete or vague answers.
Do not answer anything in English under any circumstance.`
