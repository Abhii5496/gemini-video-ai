"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import {
  Palette,
  Camera,
  Gamepad2,
  Sparkles,
  Castle,
  Brush,
  Monitor,
  Grid3X3,
  Droplets,
  Minimize2,
  User,
  Mountain,
  Building,
  Shirt,
  Car,
  Bug,
  Zap,
  Smartphone,
  Type,
  Wand2,
  Settings,
  Sun,
  PaletteIcon,
  Heart,
  CameraIcon,
  ImageIcon,
  Layers,
  Sliders,
} from "lucide-react"
import { Button } from "../ui/button"

const imageStyles = [
  {
    id: "realistic",
    name: "Realistic",
    icon: Camera,
    description: "Portrait, product photography, landscapes",
    useCase: "For prototyping or stock image needs",
  },
  {
    id: "digital-art",
    name: "Digital Art",
    icon: Palette,
    description: "Concept art, matte painting",
    useCase: "Ideal for games, films, marketing",
  },
  {
    id: "anime",
    name: "Anime / Manga",
    icon: Sparkles,
    description: "Japanese anime, chibi, manga panels",
    useCase: "Fan art, comics",
  },
  {
    id: "cartoon",
    name: "Cartoon / Comic",
    icon: Gamepad2,
    description: "Western cartoon, comic book inking",
    useCase: "Stylized characters or scenes",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    icon: Zap,
    description: "Neon cityscapes, futuristic fashion",
    useCase: "Sci-fi themes",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    icon: Castle,
    description: "Medieval castles, dragons, elves",
    useCase: "DnD and fantasy projects",
  },
  {
    id: "oil-painting",
    name: "Oil Painting",
    icon: Brush,
    description: "Baroque, Impressionism, Van Gogh style",
    useCase: "Classical art look",
  },
  {
    id: "3d-rendered",
    name: "3D Rendered",
    icon: Monitor,
    description: "Unreal Engine / Blender style",
    useCase: "Game asset previewing",
  },
  {
    id: "pixel-art",
    name: "Pixel Art",
    icon: Grid3X3,
    description: "8-bit, 16-bit scenes",
    useCase: "Indie game development",
  },
  {
    id: "watercolor",
    name: "Watercolor / Ink",
    icon: Droplets,
    description: "Wash-style or black ink outlines",
    useCase: "Children's books, indie artists",
  },
  {
    id: "minimal",
    name: "Minimal / Flat",
    icon: Minimize2,
    description: "UI/UX illustrations, icons",
    useCase: "Web design assets",
  },
]

const imageCategories = [
  {
    id: "characters",
    name: "Characters",
    icon: User,
    description: "Portraits, busts, full body, expressive faces",
  },
  {
    id: "landscapes",
    name: "Landscapes",
    icon: Mountain,
    description: "Mountains, oceans, skies, sci-fi planets",
  },
  {
    id: "architecture",
    name: "Architecture",
    icon: Building,
    description: "Buildings, interiors, temples, castles",
  },
  {
    id: "fashion",
    name: "Fashion / Clothing",
    icon: Shirt,
    description: "Outfit design, fantasy armor, streetwear",
  },
  {
    id: "vehicles",
    name: "Vehicles / Machines",
    icon: Car,
    description: "Spaceships, mechs, cars, robots",
  },
  {
    id: "creatures",
    name: "Creatures",
    icon: Bug,
    description: "Mythical beasts, hybrids, alien lifeforms",
  },
  {
    id: "abstract",
    name: "Abstract / Experimental",
    icon: Zap,
    description: "Fractals, glitches, geometric visuals",
  },
  {
    id: "ui-mockups",
    name: "UI/UX Mockups",
    icon: Smartphone,
    description: "App screens, dashboards, cards",
  },
  {
    id: "typography",
    name: "Typography Art",
    icon: Type,
    description: "Stylized quotes, neon signs, posters",
  },
]

const lightingOptions = [
  "cinematic",
  "ambient",
  "dramatic",
  "backlit",
  "natural",
  "studio",
  "golden hour",
  "neon",
]
const colorPalettes = [
  "vibrant",
  "pastel",
  "monochrome",
  "neon",
  "dark",
  "warm",
  "cool",
  "earth tones",
]
const moods = [
  "eerie",
  "joyful",
  "dystopian",
  "serene",
  "energetic",
  "melancholic",
  "mysterious",
  "peaceful",
]
const compositions = [
  "close-up",
  "aerial",
  "isometric",
  "depth-of-field",
  "wide angle",
  "macro",
  "portrait",
  "landscape",
]

export default function ImageGenerator() {
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [promptType, setPromptType] = useState("simple")
  const [simplePrompt, setSimplePrompt] = useState("")
  const [guidedPrompt, setGuidedPrompt] = useState({
    subject: "",
    setting: "",
    style: "",
    lighting: "",
    mood: "",
  })
  const [selectedModifiers, setSelectedModifiers] = useState({
    lighting: [],
    colorPalette: [],
    mood: [],
    composition: [],
  })
  const [contextImage, setContextImage] = useState(null)
  const [contextImagePreview, setContextImagePreview] = useState(null)
  const [result, setResult] = useState({ text: "", imageBase64: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const toggleModifier = (category, value) => {
    setSelectedModifiers(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value],
    }))
  }

  const applyTemplate = template => {
    setSimplePrompt(template)
  }

  const generateFinalPrompt = () => {
    let prompt = ""
    if (promptType === "simple") {
      prompt = simplePrompt
    } else {
      const parts = [
        guidedPrompt.subject,
        guidedPrompt.setting,
        guidedPrompt.style,
        guidedPrompt.lighting,
        guidedPrompt.mood,
      ].filter(Boolean)
      prompt = parts.join(", ")
    }
    const allModifiers = Object.values(selectedModifiers).flat()
    if (allModifiers.length > 0) {
      prompt += prompt ? `, ${allModifiers.join(", ")}` : allModifiers.join(", ")
    }
    return prompt || "Enter a prompt to see preview..."
  }

  const handleImageChange = e => {
    const file = e.target.files?.[0] || null
    setContextImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setContextImagePreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setContextImagePreview(null)
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError("")
    setResult({ text: "", imageBase64: "" })
    let imageBase64 = ""
    if (contextImage) {
      const reader = new FileReader()
      imageBase64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(",")[1])
        reader.onerror = reject
        reader.readAsDataURL(contextImage)
      })
    }
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: generateFinalPrompt(), imageBase64 }),
      })
      if (!res.ok) throw new Error("Failed to generate image")
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Image Generator Studio
          </h1>
          <p className="text-gray-600">
            Create stunning images with comprehensive style and prompt controls
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Styles & Categories */}
          <div className="xl:col-span-1 space-y-6">
            {/* Image Styles as Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Visual Styles
                </CardTitle>
                <CardDescription>Choose your artistic style</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageStyles.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{style.name}</span>
                          <span className="text-xs text-gray-500">{style.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Image Categories as Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Categories
                </CardTitle>
                <CardDescription>Select content themes</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-xs text-gray-500">{category.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Prompt Design */}
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Prompt Design
                </CardTitle>
                <CardDescription>Craft your image description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Type Selection */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={promptType === "simple" ? "default" : "outline"}
                    onClick={() => setPromptType("simple")}
                    className="flex-1"
                  >
                    Simple
                  </Button>
                  <Button
                    size="sm"
                    variant={promptType === "guided" ? "default" : "outline"}
                    onClick={() => setPromptType("guided")}
                    className="flex-1"
                  >
                    Guided
                  </Button>
                </div>

                {/* Simple Prompt */}
                {promptType === "simple" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="simple-prompt">Describe your image</Label>
                      <Textarea
                        id="simple-prompt"
                        placeholder="A majestic dragon soaring over a medieval castle at sunset..."
                        value={simplePrompt}
                        onChange={e => setSimplePrompt(e.target.value)}
                        className="mt-2"
                        rows={4}
                      />
                    </div>

                    {/* Prompt Templates */}
                    <div>
                      <Label className="text-sm">Quick Templates</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {promptTemplates.map((template, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-purple-100 text-xs"
                            onClick={() => applyTemplate(template)}
                          >
                            {template}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Guided Prompt */}
                {promptType === "guided" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., A warrior, A spaceship"
                        value={guidedPrompt.subject}
                        onChange={e =>
                          setGuidedPrompt(prev => ({ ...prev, subject: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="setting">Setting</Label>
                      <Input
                        id="setting"
                        placeholder="e.g., In a futuristic city"
                        value={guidedPrompt.setting}
                        onChange={e =>
                          setGuidedPrompt(prev => ({ ...prev, setting: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="guided-style">Style</Label>
                      <Input
                        id="guided-style"
                        placeholder="e.g., Photorealistic"
                        value={guidedPrompt.style}
                        onChange={e =>
                          setGuidedPrompt(prev => ({ ...prev, style: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="guided-lighting">Lighting</Label>
                      <Input
                        id="guided-lighting"
                        placeholder="e.g., Dramatic lighting"
                        value={guidedPrompt.lighting}
                        onChange={e =>
                          setGuidedPrompt(prev => ({ ...prev, lighting: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="guided-mood">Mood</Label>
                      <Input
                        id="guided-mood"
                        placeholder="e.g., Mysterious, Epic"
                        value={guidedPrompt.mood}
                        onChange={e => setGuidedPrompt(prev => ({ ...prev, mood: e.target.value }))}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generation Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Select defaultValue="1024x1024">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512x512">512×512</SelectItem>
                        <SelectItem value="1024x1024">1024×1024</SelectItem>
                        <SelectItem value="1024x768">1024×768</SelectItem>
                        <SelectItem value="768x1024">768×1024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quality">Quality</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="mb-2"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {contextImagePreview && (
                  <img
                    src={contextImagePreview}
                    alt="Context"
                    className="mb-2 rounded shadow w-full"
                  />
                )}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
                {error && <div className="mt-2 text-red-600">{error}</div>}
                {result.imageBase64 && (
                  <img
                    src={`data:image/png;base64,${result.imageBase64}`}
                    alt="Generated"
                    className="mt-4 rounded shadow w-full"
                  />
                )}
                {result.text && <div className="mt-2 p-2 bg-gray-100 rounded">{result.text}</div>}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Modifiers & Preview */}
          <div className="xl:col-span-1 space-y-6">
            {/* Modifiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Modifiers
                </CardTitle>
                <CardDescription>Fine-tune your image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Lighting */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm">
                    <Sun className="w-4 h-4" />
                    Lighting
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {lightingOptions.map(option => (
                      <Badge
                        key={option}
                        variant={
                          selectedModifiers.lighting.includes(option) ? "default" : "outline"
                        }
                        className="cursor-pointer text-xs"
                        onClick={() => toggleModifier("lighting", option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Color Palette */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm">
                    <PaletteIcon className="w-4 h-4" />
                    Color Palette
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {colorPalettes.map(option => (
                      <Badge
                        key={option}
                        variant={
                          selectedModifiers.colorPalette.includes(option) ? "default" : "outline"
                        }
                        className="cursor-pointer text-xs"
                        onClick={() => toggleModifier("colorPalette", option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Mood */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm">
                    <Heart className="w-4 h-4" />
                    Mood
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map(option => (
                      <Badge
                        key={option}
                        variant={selectedModifiers.mood.includes(option) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleModifier("mood", option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Composition */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm">
                    <CameraIcon className="w-4 h-4" />
                    Composition
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {compositions.map(option => (
                      <Badge
                        key={option}
                        variant={
                          selectedModifiers.composition.includes(option) ? "default" : "outline"
                        }
                        className="cursor-pointer text-xs"
                        onClick={() => toggleModifier("composition", option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Prompt Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Final prompt:</p>
                  <p className="font-mono text-sm leading-relaxed">{generateFinalPrompt()}</p>
                </div>

                {/* Selected Items Summary */}
                <div className="mt-4 space-y-2">
                  {selectedStyle && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Style: {imageStyles.find(s => s.id === selectedStyle)?.name}
                      </Badge>
                    </div>
                  )}
                  {selectedCategory && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Category: {imageCategories.find(c => c.id === selectedCategory)?.name}
                      </Badge>
                    </div>
                  )}
                  {Object.values(selectedModifiers).flat().length > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {Object.values(selectedModifiers).flat().length} modifiers applied
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
