-- Premium Advanced ESP & FOV Aimbot Script for Roblox Mobile / PC
-- Features: Box ESP, Names, Tracers, Aimbot with Customizable FOV Circle
-- Optimized for Smooth Mobile Execution and Absolute Stability

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local CoreGui = game:GetService("CoreGui")
local UserInputService = game:GetService("UserInputService")
local Camera = workspace.CurrentCamera
local LocalPlayer = Players.LocalPlayer

-- Global Configuration State
local Config = {
    ESP_Enabled = true,
    Boxes = true,
    Names = true,
    Tracers = true,
    Aimbot_Enabled = true,
    Aimbot_Smoothness = 0.2, -- Lower value = faster lock, Higher value = smoother
    FOV_Visible = true,
    FOV_Radius = 100,
    BoxColor = Color3.fromRGB(255, 0, 0),
    NameColor = Color3.fromRGB(255, 255, 255),
    TracerColor = Color3.fromRGB(255, 255, 0),
    FOVColor = Color3.fromRGB(0, 255, 255)
}

-- Screen GUI Container for Menu
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "Premium_Hub_System"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

if syn and syn.protect_gui then
    syn.protect_gui(ScreenGui)
    ScreenGui.Parent = CoreGui
elseif getguiwrapper then
    ScreenGui.Parent = getguiwrapper()
else
    ScreenGui.Parent = CoreGui
end

-- Create GUI Elements
local MainFrame = Instance.new("Frame")
local Title = Instance.new("TextLabel")
local ToggleESP = Instance.new("TextButton")
local ToggleBoxes = Instance.new("TextButton")
local ToggleNames = Instance.new("TextButton")
local ToggleTracers = Instance.new("TextButton")
local ToggleAimbot = Instance.new("TextButton")
local ToggleFOV = Instance.new("TextButton")
local IncreaseFOV = Instance.new("TextButton")
local DecreaseFOV = Instance.new("TextButton")
local CloseButton = Instance.new("TextButton")
local OpenButton = Instance.new("TextButton")

-- Style Main Window
MainFrame.Name = "MainFrame"
MainFrame.Parent = ScreenGui
MainFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
MainFrame.BorderSizePixel = 0
MainFrame.Position = UDim2.new(0.05, 0, 0.15, 0)
MainFrame.Size = UDim2.new(0, 240, 0, 470)
MainFrame.Active = true
MainFrame.Draggable = true

Title.Name = "Title"
Title.Parent = MainFrame
Title.BackgroundColor3 = Color3.fromRGB(40, 40, 45)
Title.BorderSizePixel = 0
Title.Size = UDim2.new(1, 0, 0, 40)
Title.Font = Enum.Font.SourceSansBold
Title.Text = "PREMIUM ESP & AIMBOT"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextSize = 16

-- Helper function to style buttons easily
local function StyleButton(button, text, posY)
    button.Parent = MainFrame
    button.BackgroundColor3 = Color3.fromRGB(50, 150, 50)
    button.BorderSizePixel = 0
    button.Position = UDim2.new(0.05, 0, 0, posY)
    button.Size = UDim2.new(0.9, 0, 0, 35)
    button.Font = Enum.Font.SourceSans
    button.Text = text .. " : ON"
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.TextSize = 14
end

StyleButton(ToggleESP, "Master ESP", 50)
StyleButton(ToggleBoxes, "Boxes", 95)
StyleButton(ToggleNames, "Names", 140)
StyleButton(ToggleTracers, "Tracers", 185)
StyleButton(ToggleAimbot, "Aimbot Lock", 240)
StyleButton(ToggleFOV, "Show FOV Circle", 285)

-- Style Adjust FOV Buttons
StyleButton(IncreaseFOV, "Increase FOV (+10)", 340)
IncreaseFOV.BackgroundColor3 = Color3.fromRGB(70, 70, 80)
IncreaseFOV.Text = "Increase FOV (+10)"

StyleButton(DecreaseFOV, "Decrease FOV (-10)", 385)
DecreaseFOV.BackgroundColor3 = Color3.fromRGB(70, 70, 80)
DecreaseFOV.Text = "Decrease FOV (-10)"

-- Style Minimalist Open/Close System
CloseButton.Parent = MainFrame
CloseButton.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
CloseButton.Position = UDim2.new(0.85, 0, 0, 7)
CloseButton.Size = UDim2.new(0, 25, 0, 25)
CloseButton.Text = "X"
CloseButton.TextColor3 = Color3.fromRGB(255, 255, 255)

OpenButton.Parent = ScreenGui
OpenButton.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
OpenButton.Position = UDim2.new(0, 10, 0, 10)
OpenButton.Size = UDim2.new(0, 100, 0, 35)
OpenButton.Text = "OPEN HUB"
OpenButton.TextColor3 = Color3.fromRGB(255, 255, 255)
OpenButton.Visible = false

-- Button Visuals Sync
local function UpdateButtonVisuals(button, state, label)
    if state then
        button.BackgroundColor3 = Color3.fromRGB(50, 150, 50)
        button.Text = label .. " : ON"
    else
        button.BackgroundColor3 = Color3.fromRGB(150, 50, 50)
        button.Text = label .. " : OFF"
    end
end

UpdateButtonVisuals(ToggleESP, Config.ESP_Enabled, "Master ESP")
UpdateButtonVisuals(ToggleBoxes, Config.Boxes, "Boxes")
UpdateButtonVisuals(ToggleNames, Config.Names, "Names")
UpdateButtonVisuals(ToggleTracers, Config.Tracers, "Tracers")
UpdateButtonVisuals(ToggleAimbot, Config.Aimbot_Enabled, "Aimbot Lock")
UpdateButtonVisuals(ToggleFOV, Config.FOV_Visible, "Show FOV Circle")

-- Menu Click Handlers
ToggleESP.MouseButton1Click:Connect(function()
    Config.ESP_Enabled = not Config.ESP_Enabled
    UpdateButtonVisuals(ToggleESP, Config.ESP_Enabled, "Master ESP")
end)

ToggleBoxes.MouseButton1Click:Connect(function()
    Config.Boxes = not Config.Boxes
    UpdateButtonVisuals(ToggleBoxes, Config.Boxes, "Boxes")
end)

ToggleNames.MouseButton1Click:Connect(function()
    Config.Names = not Config.Names
    UpdateButtonVisuals(ToggleNames, Config.Names, "Names")
end)

ToggleTracers.MouseButton1Click:Connect(function()
    Config.Tracers = not Config.Tracers
    UpdateButtonVisuals(ToggleTracers, Config.Tracers, "Tracers")
end)

ToggleAimbot.MouseButton1Click:Connect(function()
    Config.Aimbot_Enabled = not Config.Aimbot_Enabled
    UpdateButtonVisuals(ToggleAimbot, Config.Aimbot_Enabled, "Aimbot Lock")
end)

ToggleFOV.MouseButton1Click:Connect(function()
    Config.FOV_Visible = not Config.FOV_Visible
    UpdateButtonVisuals(ToggleFOV, Config.FOV_Visible, "Show FOV Circle")
end)

IncreaseFOV.MouseButton1Click:Connect(function()
    Config.FOV_Radius = math.clamp(Config.FOV_Radius + 10, 10, 600)
end)

DecreaseFOV.MouseButton1Click:Connect(function()
    Config.FOV_Radius = math.clamp(Config.FOV_Radius - 10, 10, 600)
end)

CloseButton.MouseButton1Click:Connect(function()
    MainFrame.Visible = false
    OpenButton.Visible = true
end)

OpenButton.MouseButton1Click:Connect(function()
    MainFrame.Visible = true
    OpenButton.Visible = false
end)

-- Dynamic FOV Circle Initializer
local FOVCircle = Drawing.new("Circle")
FOVCircle.Thickness = 1.5
FOVCircle.Filled = false
FOVCircle.NumSides = 60

-- Calculate Closest Target Inside FOV Radius
local function GetClosestPlayerToCenter()
    local Target = nil
    local MaxDistance = Config.FOV_Radius
    local CenterPosition = Vector2.new(Camera.ViewportSize.X / 2, Camera.ViewportSize.Y / 2)

    for _, player in ipairs(Players:GetPlayers()) do
        if player ~= LocalPlayer and player.Character and player.Character:FindFirstChild("HumanoidRootPart") and player.Character:FindFirstChild("Humanoid") and player.Character.Humanoid.Health > 0 then
            local Position, OnScreen = Camera:WorldToViewportPoint(player.Character.HumanoidRootPart.Position)
            
            if OnScreen then
                local Distance = (CenterPosition - Vector2.new(Position.X, Position.Y)).Magnitude
                if Distance < MaxDistance then
                    MaxDistance = Distance
                    Target = player
                end
            end
        end
    end
    return Target
end

-- Memory Drawing Cache
local Cache = {}

local function CreateDrawings(player)
    if player == LocalPlayer then return end

    local Box = Drawing.new("Square")
    Box.Visible = false
    Box.Color = Config.BoxColor
    Box.Thickness = 1.5
    Box.Filled = false

    local Name = Drawing.new("Text")
    Name.Visible = false
    Name.Text = player.Name
    Name.Size = 16
    Name.Color = Config.NameColor
    Name.Center = true
    Name.Outline = true

    local Tracer = Drawing.new("Line")
    Tracer.Visible = false
    Tracer.Color = Config.TracerColor
    Tracer.Thickness = 1

    Cache[player] = {Box = Box, Name = Name, Tracer = Tracer}

    local Connection
    Connection = RunService.RenderStepped:Connect(function()
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") and player.Character:FindFirstChild("Humanoid") and player.Character.Humanoid.Health > 0 then
            local RootPart = player.Character.HumanoidRootPart
            local Position, OnScreen = Camera:WorldToViewportPoint(RootPart.Position)

            if OnScreen and Config.ESP_Enabled then
                if Config.Boxes then
                    local Scale = 1000 / (Position.Z * 2)
                    Box.Size = Vector2.new(Scale, Scale * 1.5)
                    Box.Position = Vector2.new(Position.X - Box.Size.X / 2, Position.Y - Box.Size.Y / 2)
                    Box.Color = Config.BoxColor
                    Box.Visible = true
                else
                    Box.Visible = false
                end

                if Config.Names then
                    Name.Position = Vector2.new(Position.X, Position.Y - (1000 / (Position.Z * 2)) * 0.75 - 18)
                    Name.Color = Config.NameColor
                    Name.Visible = true
                else
                    Name.Visible = false
                end

                if Config.Tracers then
                    Tracer.From = Vector2.new(Camera.ViewportSize.X / 2, Camera.ViewportSize.Y)
                    Tracer.To = Vector2.new(Position.X, Position.Y)
                    Tracer.Color = Config.TracerColor
                    Tracer.Visible = true
                else
                    Tracer.Visible = false
                end
            else
                Box.Visible = false
                Name.Visible = false
                Tracer.Visible = false
            end
        else
            Box.Visible = false
            Name.Visible = false
            Tracer.Visible = false
            
            if not Players:FindFirstChild(player.Name) then
                Box:Remove()
                Name:Remove()
                Tracer:Remove()
                Cache[player] = nil
                Connection:Disconnect()
            end
        end
    end)
end

-- Initialize Loop for Rendering and Aim Processing
for _, player in ipairs(Players:GetPlayers()) do
    CreateDrawings(player)
end

Players.PlayerAdded:Connect(function(player)
    CreateDrawings(player)
end)

Players.PlayerRemoving:Connect(function(player)
    if Cache[player] then
        Cache[player].Box:Remove()
        Cache[player].Name:Remove()
        Cache[player].Tracer:Remove()
        Cache[player] = nil
    end
end)

-- Main Aimbot Loop
RunService.RenderStepped:Connect(function()
    -- Dynamic update FOV placement
    local Center = Vector2.new(Camera.ViewportSize.X / 2, Camera.ViewportSize.Y / 2)
    FOVCircle.Position = Center
    FOVCircle.Radius = Config.FOV_Radius
    FOVCircle.Color = Config.FOVColor
    FOVCircle.Visible = Config.FOV_Visible

    -- Lock targets smoothly
    if Config.Aimbot_Enabled then
        local TargetPlayer = GetClosestPlayerToCenter()
        if TargetPlayer and TargetPlayer.Character and TargetPlayer.Character:FindFirstChild("Head") then
            local Head = TargetPlayer.Character.Head
            local TargetPos, OnScreen = Camera:WorldToViewportPoint(Head.Position)
            if OnScreen then
                -- Perform camera interpolation for natural aim vector transformation
                local CurrentCFrame = Camera.CFrame
                local AimTarget = CFrame.new(CurrentCFrame.Position, Head.Position)
                Camera.CFrame = CurrentCFrame:Lerp(AimTarget, Config.Aimbot_Smoothness)
            end
        end
    end
end)
