---
title: "Row Your Boat: How I made a boat physics simulation inside Oblivion Remastered"
layout: post
image: /img/blog/rowyourboat.jpg
hidden: true
---

If creativity is borne out of constraints, creating mods for games must be one of the most creative things you can do as a programmer. It’s just so fun to hack a game engine to do something it was never supposed to do.

This blog post goes into depth describing a mod I made for the game [Oblivion Remastered](https://elderscrolls.bethesda.net/en-US/oblivion-remastered), a full graphics overhaul of the classic 2006 open-world RPG [Elder Scrolls IV: Oblivion](https://elderscrolls.bethesda.net/en/oblivion) . The mod, [Row Your Boat](https://www.nexusmods.com/oblivionremastered/mods/4273), adds something the game engine was never supposed to support: a useable rowboat. The player can purchase the rowboat, row it on any waterway, drag it over land, summon it anywhere, add upgrades, all with a realistic boat physics simulation I developed inside the limited built-in scripting engine the game engine provides.

<p><div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/SE55cqIZNp4?si=h0yatrJK7QN-r9x-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></p>

<!--excerpt-->

All of the scripts included in the mod are on my [GitHub here](https://github.com/thallada/RowYourBoat).

### The Game Release

The Elder Scrolls series from [Bethesda Softworks](https://bethesda.net/) is probably the most modded series of games ever. One of [my previous projects involved indexing and mapping hundreds of thousands of mods for Skyrim](https://www.hallada.net/2022/10/05/modmapper-putting-every-skyrim-mod-on-a-map-with-rust.html) (the latest game in the series), so I know. A major reason why modding this series is so popular is because Bethesda releases the editor tools they used to create the games to the public for free. These tools lower the barrier of entry to modding and encourages complete beginners to try their hand at creating mods. I credit modding [Elder Scrolls IV: Oblivion](https://elderscrolls.bethesda.net/en/oblivion) when I was a teenager with originally getting me interested in programming. The tool they released for the classic 2006 Oblivion is called the [Construction Set](https://en.uesp.net/wiki/Oblivion_Mod:Construction_Set). It gave modders the ability to create new items, quests, creatures, and modify pretty much anything else in the game engine Oblivion was built off of: [Gamebryo](http://www.gamebryo.com/).

When Oblivion Remastered was shadow-dropped on April 22, 2025 a lot of people doubted how moddable the remaster would be since [Virtuos](https://www.virtuosgames.com/), the developer behind the remaster, had to create a Frankenstein-meld of Gamebryo and [Unreal Engine](https://www.unrealengine.com/) to accomplish the remaster. There were no modding tools released by Virtuos or Bethesda. For the first time, modding an Elder Scrolls game wasn’t officially supported.

Despite the challenges, a whole modding community sprung up overnight and began poking and prodding at the game that was released to see what was possible. The forums lit up in frenzy and [discord groups for sharing research developments](https://discord.com/invite/ycKUrgFGMk) were established. It wasn’t long before the first mods started trickling in on the new [Oblivion Remastered site on Nexus Mods](https://www.nexusmods.com/games/oblivionremastered/mods). At first they were simple [desktop icon replacers](https://www.nexusmods.com/oblivionremastered/mods/15) or [skip intro video mods](https://www.nexusmods.com/oblivionremastered/mods/14) but they started to get more complex as modders figured out how to modify this new game engine.

The introduction of Unreal Engine was both a blessing and a curse for modding. On one hand, there is an existing community around modding games built on Unreal Engine with their own [tools and scripting system](https://docs.ue4ss.com/). But, on the other hand, it broke compatibility with pretty much every mod originally developed for classic Oblivion. It wasn’t going to be easy to port mods to the remaster. Modders would need to develop mods from scratch for the remaster.

Luckily, a lot of the modding tools that were used for the original game worked with the remaster after some tweaks. [The community discovered that you could use the original Construction Set](https://discord.com/channels/1364356029932109976/1370869854193582212) (along with [the fantastic Construction Set Extender](https://www.nexusmods.com/oblivion/mods/36370)) to create plugins that would load in Oblivion Remastered. New beta versions of [xEdit](https://github.com/TES5Edit/TES5Edit) were released to support Oblivion Remastered (a GUI program for viewing and editing data inside mod plugins). A new version of [Oblivion Script Extender for Oblivion Remastered (OBSE64)](https://github.com/ianpatt/obse64) was released (adds new scripting functions through reverse-engineering of the game engine). It was starting to look like it would be possible to create some truly complex mods in the remaster.

### The Idea

![Screenshot in Oblivion Remastered from the Imperial City Waterfront overlooking the Lake Rumare](/img/blog/waterfront-rumare.jpg)

In my own play-through of the game, I had just purchased the [Imperial City Waterfront shack](https://en.uesp.net/wiki/Oblivion:Shack_for_Sale) as my character’s first home, and I was wandering around the waterfront right outside the shack and looking out over at the far shoreline of the [Lake Rumare](https://en.uesp.net/wiki/Oblivion:Lake_Rumare). I suddenly had the thought: wouldn’t it be great to row a boat over there? So much of [Cyrodiil](https://en.uesp.net/wiki/Oblivion:Cyrodiil), the province Oblivion is set in, is carved by rivers and lakes, and it’s bordered on two ends by ocean. All of this space on the map is only accessible through swimming, which is the slowest and most cumbersome way to travel in the game (it’s also slow on a horse, which is the only “vehicle” in the game). Why _shouldn’t_ the player be able to take any one of those boats that litter the shorelines and row it anywhere?

### Researching the Original Boat Mod

In fact, I did remember downloading some sort of controllable boat mod for Oblivion way back in the day. A quick [search on old Oblivion Nexus Mods reveals a bunch of mods that allow the player to pilot boats](https://www.nexusmods.com/games/oblivion/mods?keyword=boat&sort=endorsements), so I knew it should be possible in theory. Out of all of these, [Jason1s Pilotable Pirate Ship](https://www.nexusmods.com/oblivion/mods/3575) stood out to me. Impressively, the mod was published just a month after the initial release of the game in 2006. A lot of the other boat mods created later (reasonably) depended on and used [OBSE](https://obse.silverlock.org/) functions for their functionality, but this mod used only the game’s built-in scripting language. OBSE64 for Oblivion Remastered isn’t yet far enough along yet to provide the same fancy functions those other mods used. So, I decided to look into the source files of Jason1’s mod to find out how he made a controllable boat with the same original limited scripting language I had to deal with.

<p>
    <figure>
        <img alt="Screenshot from Jason1s Pilotable Pirate Ship mod"
            src="/img/blog/jason1-ship-mod.jpg" />
        <figurecaption>
            <em>
            Screenshot from Jason1s Pilotable Pirate Ship mod by <a
                href="https://next.nexusmods.com/profile/Ioana?gameId=101">
                Ioana</a>.
            </em>
        </figurecaption>
    </figure>
</p>

What I found in the scripts was fascinating. Without any native vehicle physics system, collision detection API, or even basic vector and trigonometric math functions, Jason1 was able to create clever workarounds that exploited other systems in the game to create controllable boats.

For example, take a look at this excerpt from the scripts which is a custom implementation of the trigonometric functions using a 7-term [Taylor series approximation](https://en.wikipedia.org/wiki/Taylor_series#Approximation_error_and_convergence) of sine (since there is no built-in trig functions in the scripting language):

```
;Calculate radians
Set r to (d * 3.14159265) / 180
Set r2 to (d2 * 3.14159265) / 180

;Calculate offsets with Taylor series expansion of sine
Set x to r - ((r * r * r) / 6) + ((r * r * r * r * r) / 120) - ((r * r * r * r * r * r * r) / 5040)
Set y to r2 - ((r2 * r2 * r2) / 6) + ((r2 * r2 * r2 * r2 * r2) / 120) - ((r2 * r2 * r2 * r2 * r2 * r2 * r2) / 5040)
```

To detect collisions, the script positions a creature that has an invisible box mesh underneath the player that spans the whole length of the boat. Unlike the static boat mesh, this creature mesh is a moveable if something collides with it (through the [Havok physics engine](<https://en.wikipedia.org/wiki/Havok_(software)>) built into the game engine). So, if the player moves the boat forward or backward into terrain the invisible creature will get pushed upward to prevent clipping. Since you can query the Z (up-down) position of an object in the scripting language, the script can detect when the creature is getting pushed up by terrain and trigger a collision:

```
if (BoatStartMove == 0)
 ...
 set CollisionRef1 to player.PlaceAtMe aaCollider, 1, 0, 0
 CollisionRef1.SetPos z, -5
 CollisionRef1.SetScale 1.8
 Set BoatStartMove to 1
endif

... ; later on in the inner loop:

if (CollisionRef1 != 0)
 ;Check whether collision creature has been pushed upwards
 if (CollisionRef1.GetPos z > -5)
  Message "The ship has run aground"
  if (Reverse == 0)
   Set ReverseSpeed to (-10 * BoatSpeed)
   Set BoatSpeed to ReverseSpeed
   Set BoatTurn to 0
   Set Reverse to 1
   MyShip.PlaySound3D TRPMineExplode
  else
   Set BoatSpeed to 0
  endif
 else
  Set Reverse to 0
 endif
 CollisionRef1.SetPos x, BoatX
 CollisionRef1.SetPos y, BoatY
 If (CollisionRef1.GetPos z > 10)
  CollisionRef1.SetPos z, 10
 endif
 CollisionRef1.SetAngle z, BoatAngle
endif
```

The script also positions another custom invisible box mesh around the player specifically designed to keep them on the deck of the boat and ensure they don’t fall through the boat into the water (it’s called `AntiGravRef` in the script).

```
if (BoatStartMove == 0)
 set AntiGravRef to player.PlaceAtMe aaAntiGrav, 1, 0, 0
 AntiGravRef.SetScale 2.0
 AntiGravRef.SetRigidBodyMass 100
 ...
endif

... ; later on in the inner loop:

if (AntiGravRef != 0)
 AntiGravRef.SetPos x, PlayerX
 AntiGravRef.SetPos y, PlayerY
 AntiGravRef.SetPos z, PlayerZ
endif
```

This system isn’t perfect. The mod’s readme mentions that “Collision detection works best when colliding head-on and is at it's worst when colliding with several objects along the side (like the Titanic and the iceberg). If the collider gets really out of whack, it may be neccessary to rock the ship off the obstacle by selecting commands from the menu repeatedly. Dropping anchor can also help, once the obstacle is cleared. In short, it is best to not run into things.” And, there’s a lot of comments on the mod complaining about the general bugginess of this system. However, I still thought it was impressive what was accomplished within the limitations of what was available in the scripting language.

My initial plan was to simply port Jason1’s mod to Oblivion Remastered. However, I quickly realized that too many things were changed in the game engine to make Jason1’s solution feasible in the remaster.

### Getting Meshes to Appear in the Game

One of the biggest hurdles of the modding the remaster was just getting items you added in a plugin to actually appear in the game. The [ESP files](https://en.uesp.net/wiki/Oblivion_Mod:Plugins) created by the Construction Set allowed you to define new objects and their position in the game, but this was only in the old Gamebryo side of the game engine. There was a disconnect between that and the Unreal side of the game engine that prevented these objects from showing up in-game.

Luckily, [Godschildgaming](https://next.nexusmods.com/profile/Godschildgaming?gameId=7587) created [UE4SS TesSyncMapInjector](https://www.nexusmods.com/oblivionremastered/mods/1272) to solve this problem and create the glue needed between the ESP added objects and Unreal Engine. Godschildgaming created this utility through developing a [UE4SS](https://docs.ue4ss.com/) plugin which allowed modifying the state of the Unreal Engine part of the game.

Any Oblivion Remastered mod that wanted to add new objects into the world would just need to add a dependency on UE4SS TesSyncMapInjector and create an INI or JSON config file that told TesSyncMapInjector what Unreal Engine model asset to use for each ESP object (referenced using their [Formids](https://en.uesp.net/wiki/Oblivion_Mod:Formid)).

### Moving the Boat

In Jason1’s Pilotable Pirate Ship mod, the player starts moving the boat by clicking on hull or wheel of the ship (“activating”) which opens a [MessageBox](https://cs.uesp.net/wiki/MessageBox_Tutorial) with options for moving forward, backward, or stopping (“drop anchor”). The first thing I did was try to replicate this with a rowboat model in the game.

There was already a rowboat form in the game that was an activator type (`ACTI` form). It’s used in one of the main quests where the player needs to activate a rowboat that an NPC left on the shoreline. So, I duplicated that into my own activator object and hooked up a script to it that would show a similar message box when activated.

To actually move the boat in a script, all I needed was use the [`SetPos`](https://cs.uesp.net/wiki/SetPos) function on a reference to my boat. To move the boat continuously, I put the `SetPos` in a [`GameMode`](https://cs.uesp.net/wiki/GameMode) block which runs on every frame and keep adding/subtracting to the current X and Y positions (obtained with [`GetPos`](https://cs.uesp.net/wiki/GetPos)).

I found out later that I was lucky in having attempted to try to move an activator object every frame first. Moving objects like activators, NPCs, creatures, containers, lights, and misc items dropped from inventory every frame works fine in Oblivion Remastered. However, trying to move a static object every frame does not work (for example, the big pirate ship objects in the game, which are not activators). It only works if I [`Disable`](cs.uesp.net/wiki/Disable) and [`Enable`](cs.uesp.net/wiki/Enable) the static reference every other frame before moving it again. Since disabling a reference hides the mesh from the game, this causes the static reference to appear to flicker really badly as it moves. I still haven’t found a solution to this. I think I need to modify the Unreal Engine model asset to add a component that allows it to transform every frame, but the tools to edit the assets are really limited right now and I couldn’t figure it out. Luckily, everything I needed to move in my mod wasn’t one of these problematic static meshes (though, it would be nice to someday add a controllable full pirate ship in addition to a rowboat).

I was expecting to run into the problem Jason1 ran into with players clipping through the boat mesh and falling into the water while the boat was moving, but it turns out Unreal Engine actually handles this better! It had no problems with moving the player and keeping them on the deck while the boat was moving.

### Turning the Boat

The other critical part of moving the boat is turning it so the player can dictate _where_ the boat is moving. Jason1’s mod achieved this by locking the boat angle to the player’s view angle. So for example, when the player turned to look right, the boat would follow and turn right.

This is where the trigonometry comes into play. Instead of using the Taylor series that Jason1 used to approximate the sine, cosine, and tangent functions, I opted to use [this script made by Galsiah that I found on the CS Wiki](https://cs.uesp.net/wiki/Trigonometry_Functions#Galsiah_Version) which claimed to be faster and more accurate than the Taylor series.

```
; Script originally by Galsiah.
; See: https://cs.uesp.net/wiki/Trigonometry_Functions#Galsiah_Version
set RYB.ang to (RYB.ang * RYB.degToRad)
set RYB.n to 1
if (RYB.ang > 4.7123)
    set RYB.ang to (RYB.ang - 6.2832)
elseif (RYB.ang > 1.5708)
    set RYB.ang to (RYB.ang - 3.1416)
    set RYB.n to -1
endif
set RYB.t2 to (RYB.ang * RYB.ang)
set RYB.sin to RYB.n*(RYB.ang*(1 - RYB.t2*0.16605 + 0.00761*RYB.t2*RYB.t2))
set RYB.cos to RYB.n*(1 - RYB.t2*0.4967 + 0.03705*RYB.t2*RYB.t2)
set RYB.tan to (RYB.sin/RYB.cos)
```

This method employs multiple techniques like reducing the domain of the angles to `[−π/2,π/2]` (plus some wraparound logic) to prevent accuracy issues with large angles, efficient [Horner's method-style evaluation](https://en.wikipedia.org/wiki/Horner%27s_method) to reduce the number of calculations, and carefully chosen magic-number coefficients which were likely derived from [minimax approximation](https://en.wikipedia.org/wiki/Minimax_approximation_algorithm) or [curve fitting](https://en.wikipedia.org/wiki/Curve_fitting) in order to approximate the trigonometric functions as close as possible while also keeping the calculation fast.

With the ability to calculate sine and cosine, I could now calculate the next X and Y position of the boat given the current speed and the current angle of the boat:

```
set BoatX to BoatX + (sin * FrameBoatVelocity)
set BoatY to BoatY + (cos * FrameBoatVelocity)
...
BoatRef.SetPos x, BoatX
BoatRef.SetPos y, BoatY
```

To actually change the angle of the boat depending on the player look angle, I developed a similar solution to Jason1’s. Except, instead of locking the boat angle directly to player angle, I kept them independent and instead _gradually_ modified the boat angle towards the player angle every frame. This made the turning feel much more natural and gave the rowboat realistic weight. The rate of turning also slows down as the boat speed slows down, which feels more natural.

I also added a dead-zone a few degrees out from either side of the center line of the boat so if the player moves slightly it doesn’t cause the whole boat to move. This made turning the boat much more intentional and avoided the boat from weaving too much side to side when the player is just trying to go forward.

The turn rate also decays. So if the player stops turning the boat by looking directly ahead, the boat will naturally slow turning until it stops turning.

<p>
    <video width="100%" controls>
        <source src="/video/blog/rowboat-turning.mp4" type="video/mp4">
        Video of turning the rowboat on the water by looking left and right
    </video>
</p>

### Detecting Collision

Since the meshes are handled by Unreal Engine in Oblivion Remastered, I didn’t think the same method Jason1 used in his original mod would work for the remaster. I also wanted a better collision detection system since it sounded like there was a lot of issues with the method of using an invisible collision plane below the player.

At first, I tried spawning in two objects: one at the bow of the boat and another a short distance in front of the boat. And, then using a script to make the first object fire a projectile spell towards the second object. I could use [`OnMagicEffectHit`](https://cs.uesp.net/wiki/OnMagicEffectHit) on the second object to listen for the spell hitting it. If it didn’t hit within some time limit then I could assume the spell collided with something else (e.g. terrain) which means the boat collided with something. So in effect: literal [ray casting](https://en.m.wikipedia.org/wiki/Ray_casting).

This sort of worked, but a major problem with this approach was that I couldn’t find a way to make the spell casting silent and invisible. It was really annoying to see a constant stream of particles and hear the spell casting sound effects at the front of the boat while it was moving. I tried setting the spell effect visuals to `NONE` in the Construction Set but this seemed to cause the spell to not work at all in Oblivion Remastered.

Another issue with that approach was that the second object that receives the spell projectile needs to be a mesh that has collision so that the spell can actually collide with it instead of passing right through. But, I couldn’t find a single object in the game that was both invisible and had collision. The original game had invisible collision boxes that blocked the player from certain areas, but these boxes didn’t seem to have collision in Oblivion Remastered.

While looking for an object that had both collision and was invisible, I tried a rat with a permanent invisibility magic effect power. When I tried this I discovered that the game will always ensure that an actor is placed above objects or terrain to avoid clipping with them if you request to move the actor within an object or below terrain. I realized that I could abuse this behavior alone to detect collision since I could try to place an invisible and immobile actor in front of the boat, wait one frame, and then query the actual Z position of the actor to see where the game actually placed them. If the Z position returned is higher than the position I requested, then I know there is something in front of the boat that should cause a collision with the boat.

It took me a surprisingly long time to find an actor in the game that could be completely invisible and completely silent. The best solution I found was creating a new NPC that has the [VampireRace](https://en.uesp.net/wiki/Oblivion:Vampire_Race) assigned to it. It seems like at some point in the game’s development there were plans to make vampires a different race in the game, but that was scrapped so that all races could contract vampirism instead. So, this race is not used in vanilla oblivion, and because of that there are no voice lines assigned to the race. This was important because NPC of other races would occasionally say idle dialogue lines or remark on things happening and break the illusion. I also set the scale of the NPC reference in the Construction Set to as small as the game engine would allow (like ant sized basically). I also used a bunch of other script functions to make the NPC invisible and turn off any AI that would cause it to react to the player or other actors in the area:

```
RYBColliderRef.SetActorAlpha 0.0
RYBColliderRef.SetActorRefraction 10.0
RYBColliderRef.AddSpell MG14JskarInvis
RYBColliderRef.SetActorValue Aggression 0
RYBColliderRef.SetActorValue Blindness 100
RYBColliderRef.ModActorValue Sneak 0
; RYBColliderRef.SetActorsAI 0 ; causes crash in 1.511.102.0
RYBColliderRef.SetDestroyed 1
```

<p>
    <video width="100%" controls>
        <source src="/video/blog/rowboat-collision-autorow.mp4" type="video/mp4">
        Video of the boat moving forward until it collides with a beach
    </video>
</p>

It’s still not a 100% perfect solution, since the vampire can make occasional splashing sounds when it hits the water which sounds quite glitchy when it happens every few frames. When I tried a [slaughterfish](https://en.uesp.net/wiki/Oblivion:Animals#Slaughterfish), the splashing sound didn’t happen but I couldn’t figure out how to silence the slaughterfish’s idle sounds which were more annoying.

To handle collisions while turning the boat, the invisible vampire (I call it the “collider” in my script) is spawned in the direction of travel. So, when moving in reverse, the collider is spawned behind the boat instead of in front.

I was concerned that moving an NPC every frame would cause a big performance hit. In practice, I don’t think I noticed any real effect on my machine. But, to be safe, I found the optimal frequency for placing the collider that minimized the how often it had to move while also still detecting collisions fast enough.

So that’s how I detect collision my mod: hanging a tiny invisible, mute, dumb vampire off the front of the boat until it bashes into something 😉.

### Rowing the Boat

While moving the boat automatically through the MessageBox menu was convenient, it was also cumbersome and awkward to interact with. I wanted to create a way to really make the player feel like they are rowing the boat for realism and ✨_immersion_✨.

Ideally the player would just hop on the boat and press some keybind to start moving forward. But, the built-in scripting language has no way to detect keypresses. OBSE64 may add this ability eventually, and mod developers have since found ways to trigger events on keypress through UE4SS scripts. At the time I made the mod, I decided to go with a spell instead.

In essence, the spell cast keybind would become the “go forward” keybind while the player was on the boat. I just had to create a new spell called “Row”, that when cast would trigger something in my script to tell it to start moving the boat forward. Oblivion was developed with custom-scripted spells in mind, so there are actually quite a few hooks built into the scripting language for magic effects. Specifically the blocktype [ScriptEffectStart](https://cs.uesp.net/wiki/ScriptEffectStart) was very useful for this.

To allow the player to easily row backwards, I used the script function [IsSneaking](https://cs.uesp.net/wiki/IsSneaking) to change the direction of rowing if the player was sneaking when the spell was cast.

```
begin ScriptEffectStart
    if (Player.IsSneaking)
        set RYB.TriggerRowCast to 2
    else
        set RYB.TriggerRowCast to 1
    endif
end
```

The script assigned to my custom Row spell above sets a variable in my main [quest script](https://cs.uesp.net/wiki/Quest_scripts) (attached to the quest named `RYB`) to `1` or `2`. The quest script will detect the variable change and handle it by moving the boat forward or backwards respectively. Basically, this is really primitive function-calling between different scripts in the game.

To make rowing even more realistic, I also added a small [Damage Fatigue](https://en.uesp.net/wiki/Oblivion:Damage_Fatigue) on self effect to the spell so rowing slowly drained the player’s fatigue over time (just like how running does in the game). This made it so the player couldn’t row indefinitely unless they used some other spell or potion to bolster their fatigue.

Both the Damage Fatigue effect and the [Script Effect](https://en.uesp.net/wiki/Oblivion:Script_Effect) magic effects in the game cause sound and particle effects to play when cast. I found this annoying and distracting. When a spell in Oblivion has multiple magic effects assigned to it, it chooses the effect with the largest magnitude. So I just needed to find another magic effect in the game I could add that didn’t have any sounds or visual effects assigned to it and give it a large magnitude so my Row spell would use the null effects.

I initially went with the [Darkness](https://en.uesp.net/wiki/Oblivion:Darkness) effect, which is an unused magic effect in vanilla oblivion that was cut during development (this was the magic effect being used [in my initial mod release video](https://youtu.be/SE55cqIZNp4)). However, I found out from bug reports users sent after I initially released the mod that this magic effect has a bug that somehow broke Oblivion Remastered’s [Night Eye](https://en.uesp.net/wiki/Oblivion:Night-Eye) effect. I suppose that serves me right for using a magic effect that was labelled in the Construction Set as “DO NOT USE”. Luckily, there was another unused magic effect in the game with no sound and visuals: [Lock](https://en.uesp.net/wiki/Oblivion:Lock). This one also had the bonus that it could be cast as “touch”. Normally that means the effect will only apply to actors the player is touching right in front of them, but for the purposes of my Row spell, this gave the spell the touch spell animation which – if you squinted – sort of looked like the player pushing two oars forward with both arms.

<p>
    <video width="100%" controls>
        <source src="/video/blog/row-spell.mp4" type="video/mp4">
        Video of rowing the boat forward by casting the Row spell
    </video>
</p>

### Realistic Movement

When the Row spell is cast by the player while they are on the boat, it doesn’t immediately shoot the boat forward at it’s maximum speed. Instead, the Row spell cast starts a timer where, for a short time period, it adds a small amount of “force” to the boat’s current velocity every game frame. This is to simulate the effect of oars pushing through the water. After constantly rowing for a while, velocity will accumulate until the boat reaches its maximum velocity.

Since this is an effect that applies every frame, I needed to account for players having different frame rates or variations in the frame rate. It wouldn’t make any sense if the boat was faster in lower graphics settings, or slower if the player entered an area with a lower frame rate. Infamously, Oblivion has this issue with its Havok physics engine. It’s tied to the game’s frame rate which often [causes bugs like objects erratically flying off shelves when the player enters an interior under high frame-rates](https://www.reddit.com/r/oblivion/comments/512ut0/is_fps_tied_to_physics_in_this_game/).

To fix this, all values in my mod applied every frame are smoothed over with a value I call `SmoothedDeltaTime` ([borrowed term from Unity’s similar value](https://docs.unity3d.com/ScriptReference/Time-smoothDeltaTime.html)).

```
set SecondsPassed to GetSecondsPassed
; Clamp extreme values
if (SecondsPassed < 0.001)
    set SecondsPassed to 0.001
elseif (SecondsPassed > 0.1)
    set SecondsPassed to 0.1
endif

; Exponentially smooth the delta time to adjust for frame rate changes
set SmoothedDeltaTime to ((1.0 - DeltaSmoothingFactor) * SmoothedDeltaTime) + (DeltaSmoothingFactor * SecondsPassed)
```

[`GetSecondsPassed`](https://cs.uesp.net/wiki/GetSecondsPassed) returns the amount of time that has passed since the last frame.

This will smooth out frame-rate hitches so that the boat will not unexpectedly jerk forward if the player enters an area where assets are loading in and the frame rate dips low temporarily.

When the player stops rowing, the boat shouldn’t immediately stop moving. Instead the boat velocity gradually “decays” to 0 when no force is being applied. To make the decay more natural, I use exponential decay. However, since the script engine doesn’t have math functions like the [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) or exponential functions, I had to approximate it with a constant value that I pre-computed.

```
; Speed values assume a frame rate of 60fps so readjust speed values to current frame rate
set FrameRowForce to BaseRowForce * (SmoothedDeltaTime / TargetDeltaTime)

if (Rowing == 0 && AutoRowing == 0 && BoatMoving == 2)
    ; Boat is moving, but not rowing. Decay the velocity using exponential decay.
    ; velocity = velocity * (1 - decay * time)
    if (BaseBoatVelocity != 0)
        ; Calculate decay factor based on smoothed delta time
        ; Convert to time-based decay
        ; retention^(frames) = retention^(time/frameTime)
        ; We need to calculate r^(SmoothedDeltaTime/TargetDeltaTime)

        ; Approximation since we can't do pow():
        ; For small time steps, r^t ≈ 1 + t*ln(r)
        ; ln(0.98) ≈ -0.0202
        set FrameVelocityDecay to 1 + (SmoothedDeltaTime / TargetDeltaTime) * (VelocityDecayLnRetentionFactor)
        set BaseBoatVelocity to BaseBoatVelocity * FrameVelocityDecay

     ; Stop when very slow
        if (BaseBoatVelocity > -0.2 && BaseBoatVelocity < 0.2)
            set BaseBoatVelocity to 0
            set BoatMoving to 0
```

Technically, my quest script doesn’t run every game frame though. The special quest variable [`fQuestDelayTime`](https://cs.uesp.net/wiki/FQuestDelayTime) configures how often the script is run while the game is running. To save CPU resources, I try to keep this to a high value when the player is not near the boat, but once they start moving the boat I ramp it down to a value that would run the script at roughly 60 times per second.

### Dragging the Boat

The largest and most prominent river in the game: the [Niben River](https://en.uesp.net/wiki/Oblivion:Niben_River) is actually [blocked by the city Layawiin](https://en.uesp.net/wiki/Oblivion:Niben_River#Lower_Niben) in the game, which makes it impossible to row the boat all the way on the river that goes from the Imperial City into the [Topal Bay](https://en.uesp.net/wiki/Oblivion:Topal_Bay) at the bottom of the map. I knew I would need to develop an alternative way to move the boat for this reason when I set out to make this mod.

I thought it would be really cool if the player could hop out of the boat and then physically drag it over land. This would allow the player to drag it over the small strip of land blocking the river next to Layawiin and continue on rowing on the other side.

After perfecting the movement of the boat over water, I already had the necessary code to move the boat over land. I would just needed to tweak it to make it feel natural.

At this point in the project, I was heavily using [Claude](https://claude.ai/) to help me out with the script. To be honest, as a non-game developer, a lot of the 3D math involved in this project was starting to get a bit over my head. But, Claude was an amazing tool at breaking it down for me in a way I could understand and served as a great super-powered [rubber duck](https://en.wikipedia.org/wiki/Rubber_duck_debugging) for debugging issues.

At some point while developing the boat dragging code with Claude, I had the great idea to suggest it create an [artifact](https://www.anthropic.com/news/build-artifacts?subjects=announcements) by converting the OBScript code we was working on to the equivalent in JavaScript and display an interactable 2D visualization of the dragging simulation on a HTML canvas. This was **super** helpful in debugging a ton of issues with the dragging code because it tightened the feedback loop between making a change and then testing it out to see if it worked in the visualization. I spent a lot of time waiting to Oblivion Remastered to start up and load saves while working on this mod, so this was huge. I also told Claude to include lots of sliders for all the different variables in the dragging simulation so I could quickly tweak with them within the visualization and get the feel of the dragging really refined without even needing to load up the game.

[![Screenshot of a Claude artifact web page with the title “Oblivion Boat Dragging Visualization” with a canvas displaying crude shapes representing a boat and rope and a bunch of “Dragging Parameters” slider inputs below](/img/blog/rowyourboat-dragging-visualization.jpg)](https://claude.ai/public/artifacts/23380c6b-c9a4-430d-bd86-781ae588739f)

And, now that I have this artifact, it serves as great documentation for how the dragging code works! [Try it out for yourself here](https://claude.ai/public/artifacts/23380c6b-c9a4-430d-bd86-781ae588739f).

I will certainly be using LLMs to create visualizations of tricky simulations in the future. This is the sort of thing where I think AI could truly help 10x the speed and quality of code projects. To do this in the pre-LLMs days would have taken hours. Enough time that it just wouldn't have felt worth it. But now that I can have an LLM spit it out in seconds, it would be stupid to not do it and reap the benefits of it.

The dragging code tries to simulate the player dragging the boat as if they were pulling a rope attached to the center of the boat. This allows the player to walk freely around the boat without it moving as long as they don’t make the rope taut by walking more than the rope’s length away from the center of the boat (the white circle in the visualization). Once they do, it will pull the boat with a force relative to how far away the player moved. The boat itself has friction with the ground which moderates this effect, since I wanted the dragging effect to feel slow and less practical than rowing it on water.

The boat also turns to face the bow towards the player. This makes it appear like the player is dragging the boat from it’s bow. The turning effect works very similarly to how the turning works on water with gradual ramp up and decay when the angle of difference enters the deadzone.

One thing the visualization does not show is how the boat behaves when dragged up or down hills (since it is only a 2D visualization). I wanted the pitch of the boat to change so that when the player drags it up a hill it pitches up to follow the slope of the terrain, and when they drag it downhill it would pitch down. Otherwise, the boat stuck out awkwardly horizontally from the side of hills while you were dragging it. It just looked unrealistic.

Since the boat doesn’t actually have any collision detection with the ground, it was quite a challenge to find a way to adjust the pitch to follow the terrain. I ultimately ended up using the player to detect the slope of the land. Since the player is pulling the boat, the boat follows the player’s path. I can query the player’s Z position to get the height of the terrain. While dragging, every 50 units or so of distance covered, the script records the current terrain height using the player Z position. Then 50 units later, it will compare the current terrain height to the height 50 units prior and use the difference to calculate the slope of the terrain. Using this angle, the boat will gradually pitch in the direction of this angle until it roughly matches the terrain’s slope. To avoid the boat clipping inside the terrain or floating too high off the terrain, the boat’s Z position is also raised or lowered relative to the terrain’s slope.

![Screenshot of dragging the rowboat up a steep hill, the boat is pitched up to match the slope of the terrain](/img/blog/rowboat-dragging.jpg)

The effect isn’t perfect, but it’s surprising how much of a difference it makes. It’s certainly close enough to make a convincing illusion that the boat is being dragged over land.

While dragging the boat, the player gains 200 pounds of encumbrance. This is to make the dragging more realistic since they shouldn’t be able to easily go off fighting monsters while shouldering an entire rowboat around the whole time. But, they could feasibly achieve that if they really wanted to and had the right [Feather](https://en.uesp.net/wiki/Oblivion:Feather) spell, potion, or enchanted equipment.

The encumbrance is achieved by adding a special “Rowboat” item to the player’s inventory. The item is scripted so if it is dropped from the player’s inventory then the dragging stops. It also has the same rowboat model assigned to it through UE4SS TesSyncMapInjector so it even looks like a rowboat in the player’s inventory preview.

### Summoning the Boat

One of the first mods I downloaded for Oblivion Remastered was [PushTheWinButton](https://next.nexusmods.com/profile/PushTheWinButton?gameId=7587)’s excellent [Horse Whistle - Summon and Follow](https://www.nexusmods.com/oblivionremastered/mods/153) . There’s a reason pretty much every game these days that has horse mounts includes some sort of “whistle” mechanic that allows the player to summon their horse to their position immediately. While not exactly realistic, it’s just one of those things that smooths over gameplay so it’s not such a chore just to get playing.

For the rowboat to be a proper player vehicle, I knew I would also need to include some sort of summon ability. I implemented this with the same Row spell that is used to push the rowboat forward and backwards. If the player casts it while far enough away from the rowboat that they couldn’t feasibly be on it, then a MessageBox pops up instead. This message box includes two options: “Summon Boat” and “Place Boat Right Here”.

The difference between these two options is that “Summon Boat” tries to place the boat in somewhere in front of the player that obeys the terrain and objects around the player, whereas “Place Boat Right Here” ignores all of that and just places the boat exactly in front of the player even if it would clip with terrain or objects.

“Place Boat Right Here” was easy to implement since I just needed to use the same sin function I use for boat movement to find a spot in front of where the player is looking and then use [`MoveTo`](https://cs.uesp.net/wiki/MoveTo) and `SetPos` to move the boat to that spot.

“Summon Boat” was a bit more complicated since I needed to first scout out a good position by spawning in the same tiny vampire collider that I use for collision detection in front of the player, wait a frame, then query its position to get the final spot the game engine decided doesn’t clip with terrain or objects, then move the collider away and spawn in the boat. This worked in most cases, but there were a few spots I found in the world where the game decides to place the collider somewhere deep underground. So that’s why I kept the “Place Boat Right Here” as a back-up if that ever happens.

I also found that I needed to disable the boat and then re-enable it after moving it, otherwise sometimes the boat would weirdly not have any collision so the player could walk right through it and it would not be activatable.

### Rocking the Boat

Inspired by the classic Oblivion mod [QQuix - Rock rock rock your ship](https://www.nexusmods.com/oblivion/mods/29649), I wanted to add even more realism to the mod by adding a gentle rocking animation to the boat while it is in the water.

I achieved this (with a lot of help from Claude 🤖) by creating a system of combining three separate random sine wave oscillations:

- Primary wave: 30 degrees/second
- Secondary wave: 45 degrees/second
- Tertiary wave: 25 degrees/second

Combining three random waves instead of a single makes the rocking more complex and unpredictable compared a single wave which would have resulted in monotonous, predictable motion.

The boat pitches by combining the primary and secondary waves:

```
set TargetRockPitchOffset to RockAmplitudePitch * (rockSin * 0.8 + rockSin2 * 0.2)
```

And rolls side-to-side by using a cosine function to create a 90-degree phase offset off the secondary and tertiary waves:

```
set TargetRockRollOffset to RockAmplitudeRoll * (rockCos3 * 0.7 + rockSin2 * 0.3)
```

And bobs up and down slightly by combining the primary and secondary waves:

```
set TargetRockZOffset to RockAmplitudeZ * (rockSin * 0.7 + rockSin2 * 0.3 + RockRandomPhase)
```

This all combines to create a fairly convincing boat rocking motion in the water:

<p>
    <video width="100%" controls>
        <source src="/video/blog/rocking-rowboat.mp4" type="video/mp4">
        Video of rowboat gently rocking in the water
    </video>
</p>

To increase the realism, the rocking motion gets amplified by how fast the boat is moving:

```
; Increase rocking amplitude based on speed
set TargetRockZOffset to TargetRockZOffset * (1 + (AbsoluteBoatVelocity / BoatMaxVelocity) * RockSpeedFactor)
set TargetRockPitchOffset to TargetRockPitchOffset * (1 + (AbsoluteBoatVelocity / BoatMaxVelocity) * RockSpeedFactor * 1.5)
set TargetRockRollOffset to TargetRockRollOffset * (1 + (AbsoluteBoatVelocity / BoatMaxVelocity) * RockSpeedFactor * 0.7)
```

And the rocking motion also gets amplified by bad weather by querying the wind speed with [`GetWindSpeed`](https://cs.uesp.net/wiki/GetWindSpeed) and adjusting the motion accordingly:

```
; Apply weather factor (based on wind speed)
set WindSpeed to GetWindSpeed
set TargetRockZOffset to TargetRockZOffset * (1 + (WindSpeed * RockWeatherFactor))
; Limit extreme Z offsets that would mess with boat-in-water detection
if (BoatZ + TargetRockZOffset < -RockMaxAbsoluteZ)
    set TargetRockZOffset to -RockMaxAbsoluteZ - BoatZ
elseif (BoatZ + TargetRockZOffset > RockMaxAbsoluteZ)
    set TargetRockZOffset to RockMaxAbsoluteZ - BoatZ
endif
set TargetRockPitchOffset to TargetRockPitchOffset * (1 + (WindSpeed * RockWeatherFactor))
set TargetRockRollOffset to TargetRockRollOffset * (1 + (WindSpeed * RockWeatherFactor))
```

To make the motion even more responsive, I integrated the player’s weight into the rocking motion.

<p>
    <video width="100%" controls>
        <source src="/video/blog/rocking-rowboat-player-weight.mp4" type="video/mp4">
        Video of player running back and forth along the boat and the boat pitching and rolling in response
    </video>
</p>

When the player is within a 3D boundary area above the deck of the boat, I translate the player’s position into the boat’s local coordinate system:

```
; Calculate player position relative to boat center
set PlayerRelativeX to PlayerX - BoatX
set PlayerRelativeY to PlayerY - BoatY

; Calculate boat's forward and right vectors using BoatAngle directly
; Forward vector (bow direction): sin(BoatAngle), cos(BoatAngle)
; Right vector (starboard direction): cos(BoatAngle), -sin(BoatAngle)
; PlayerLocalY: positive = toward bow, negative = toward stern
set PlayerLocalY to PlayerRelativeX * sin + PlayerRelativeY * cos
; PlayerLocalX: positive = toward starboard, negative = toward port  
set PlayerLocalX to PlayerRelativeX * cos - PlayerRelativeY * sin
set PlayerLocalZ to PlayerZ - BoatZWithRock
```

Then I calculate a weight effect to apply to the pitch and roll that diminishes with the distance the player is from the center of the boat. I would normally use a square root function to calculate the player’s distance from the center of the boat, but since Oblivion’s scripting language doesn’t include a square root function, I had to use [Newton’s method](https://en.wikipedia.org/wiki/Newton%27s_method) to find the approximate square root in two iterations:

```
; Calculate distance from boat center for falloff effect
set PlayerDistanceFromCenter to PlayerRelativeX * PlayerRelativeX + PlayerRelativeY * PlayerRelativeY
; Newton's method square root approximation (2 iterations)
set PlayerDistanceFromCenter to PlayerWeightMaxDistanceForward ; Initial guess
set PlayerDistanceFromCenter to (PlayerDistanceFromCenter + ((PlayerRelativeX * PlayerRelativeX + PlayerRelativeY * PlayerRelativeY) / PlayerDistanceFromCenter)) / 2
set PlayerDistanceFromCenter to (PlayerDistanceFromCenter + ((PlayerRelativeX * PlayerRelativeX + PlayerRelativeY * PlayerRelativeY) / PlayerDistanceFromCenter)) / 2
```

Using the distance from center I can then calculate an influence factor to apply to the pitch and roll on top of the randomized environmental pitch and roll (by adding these offsets):

```
; Calculate influence factor (1.0 at center, 0.0 at max distance)
; Limit effect area to a box approximately the area above the boat up 60 units (PlayerWeightMaxDistanceVertical)
if (PlayerDistanceFromCenter <= PlayerWeightMaxDistanceForward && PlayerLocalZ < PlayerWeightMaxDistanceVertical && PlayerLocalX < PlayerWeightMaxDistanceSide && PlayerLocalX > -PlayerWeightMaxDistanceSide)
    set PlayerWeightInfluence to 1.0 - (PlayerDistanceFromCenter / PlayerWeightMaxDistanceForward)
else
    set PlayerWeightInfluence to 0
endif

; Calculate target pitch offset based on player's fore/aft position
; Positive PlayerLocalY = toward bow (front) = boat should pitch forward (bow dips down)
; Negative PlayerLocalY = toward stern (back) = boat should pitch backward (stern dips down)
set TargetPlayerWeightPitchOffset to PlayerLocalY * PlayerWeightPitchFactor * PlayerWeightInfluence

; Calculate target roll offset based on player's port/starboard position
; Positive PlayerLocalX = toward starboard (right) = boat should roll starboard (startboard dips down)
; Negative PlayerLocalX = toward port (left) = boat should roll port (port dips down)
set TargetPlayerWeightRollOffset to -PlayerLocalX * PlayerWeightRollFactor * PlayerWeightInfluence

; Smooth the transition to prevent jarring movements
set PlayerWeightPitchOffset to PlayerWeightPitchOffset + ((TargetPlayerWeightPitchOffset - PlayerWeightPitchOffset) * PlayerWeightSmoothingFactor * SmoothedDeltaTime / TargetDeltaTime)
set PlayerWeightRollOffset to PlayerWeightRollOffset + ((TargetPlayerWeightRollOffset - PlayerWeightRollOffset) * PlayerWeightSmoothingFactor * SmoothedDeltaTime / TargetDeltaTime)
```

All of the rocking motion stops if the boat collides with land or if the player moves far enough away from the boat to save unnecessary processing. For players that want to minimize the performance impact, I also added a setting in the MessageBox menu to turn off the rocking animation.

### Boat Upgrades

The rowboat itself is purchasable from [Sergius Verus](https://en.uesp.net/wiki/Oblivion:Sergius_Verus) at the [Three Brothers Trade Goods](https://en.uesp.net/wiki/Oblivion:Three_Brothers_Trade_Goods) in the Market District of the Imperial City. This was implemented similarly to how [buying houses in the game works](https://en.uesp.net/wiki/Oblivion:Buy_a_house_in_the_Imperial_City). You purchase a deed document from the trader which has a script attached to it with an [`OnAdd`](https://cs.uesp.net/wiki/OnAdd) block that triggers when it is added to the player’s inventory which then changes the owner of the house to the player and gives them the key. In the case of my rowboat, it just flips a variable in my script which makes the rowboat operable by the player and removes the for-sale sign next to the boat where it is docked in the [Waterfront District](https://en.uesp.net/wiki/Oblivion:Waterfront_District).

I thought it would be fun to also add purchasable upgrades to the rowboat that improve the experience; just like how you can purchase furniture upgrades to your house from traders. The upgrades I came up with for my rowboat are: a storage chest, a lamp, and a rope ladder that auto-deploys if the player falls overboard. In addition to these purchasable upgrades, I also included a free seat on the boat. The seat is just a standard stool in the game that I positioned so that it clips into the lip on the stern of the boat model.

Implementing these “attachments” for the boat ended up being one of the most challenging parts of developing this mod. The game sees them all as separate references. There’s no way to group them together with the rowboat as a single entity for the purposes of moving them in concert. I had to manually calculate and position each of the attachments relative to the boat’s current position.

I spent wayyy too long fiddling with the positioning of these attachments relative to the boat position. After I added the rocking animation to the boat, it got even more complicated since I had to account for the pitch and roll of the boat to determine the position of the attachments. I kept thinking I got it right, but all the attachments kept being _slightly_ off of where they should be. I applied an extreme pitch and roll to the boat, which exaggerated the error while debugging this:

<p>
 <div class="row">
  <figure>
    <img alt="Screenshot of the rowboat pitched and tilted at an extreme angle and the lamp misplaced too far right and down from where it should be" src="/img/blog/rowyourboat-lamp-misplaced.jpg" />
  </figure>
  <figure>
    <img alt="Screenshot of the rowboat pitched and tilted at an extreme angle and the chest and stool misplaced too far left and back from where they should be" src="/img/blog/rowyourboat-chest-seat-misplaced.jpg" />
  </figure>
 </div>
</p>

Eventually I realized that the order that yaw, roll, and pitch were applied mattered. And confusingly, the order that these should be applied can vary between game engines. I had no idea which order Oblivion Remastered used, so I had to apply them in different orders until I finally found the correct order (Oblivion ended up being a ZXY kind of engine). Here’s the final code for calculating the position of the seat at the back of the boat:

```
; yaw
set RYB.TempX to RYB.SeatSideOffset * RYB.cos + RYB.SeatForwardOffset * RYB.sin
set RYB.TempY to RYB.SeatForwardOffset * RYB.cos - RYB.SeatSideOffset * RYB.sin
set RYB.TempZ to RYB.SeatZOffset
; roll
set RYB.OrigX to RYB.TempX
set RYB.OrigZ to RYB.TempZ
set RYB.TempX to RYB.OrigX * RYB.CosRoll - RYB.OrigZ * RYB.SinRoll
set RYB.TempZ to RYB.OrigX * RYB.SinRoll + RYB.OrigZ * RYB.CosRoll
; pitch
set RYB.OrigY to RYB.TempY
set RYB.OrigZ to RYB.TempZ
set RYB.TempY to RYB.OrigY * RYB.CosPitch + RYB.OrigZ * RYB.SinPitch
set RYB.TempZ to -RYB.OrigY * RYB.SinPitch + RYB.OrigZ * RYB.CosPitch
; to world coords
set RYB.SeatX to RYB.BoatX + RYB.TempX
set RYB.SeatY to RYB.BoatY + RYB.TempY
set RYB.SeatZ to RYB.BoatZ + RYB.TempZ + RYB.RockZOffset
```

### Mod Release

The finally released the mod on June 4th, 2025 [on Nexus Mods](https://www.nexusmods.com/oblivionremastered/mods/4273) and [made a post on the r/oblivionmods subreddit](https://www.reddit.com/r/oblivionmods/comments/1l3pg6z/row_your_boat_usable_rowboat_mod/). It was fun seeing the response. A lot of people were excited to see a mod of this complexity released. I think they saw it as a sign that Oblivion Remastered was more mod-friendly than the doubters believed, and we would all see more sophisticated mods coming out for Oblivion Remastered soon. [Rock Paper Shotgun even featured my mod](https://www.rockpapershotgun.com/oblivion-remastered-your-own-personal-rideable-rowboat-mod-sailing-around-cyrodiil-as-magical-mariner), which was cool!

### The Mysterious Case of The Spontaneously Duplicating Rowboats

After release, I made a few updated versions that fixed various bugs that were reported by the community in the [bug tracker](https://www.nexusmods.com/oblivionremastered/mods/4273?tab=bugs). But, one bug that was _really_ stumping me was the issue where players would report that sometimes their boat would spontaneously duplicate itself rendering both boats broken and unusable.

After a long session of digging through my scripts for any culprit code, I became convinced that this wasn’t an issue with my mod. I was beginning to think I was actually running into a bug of either one of my dependencies (like TesSyncMapInjector) or a bug in the game engine itself.

When I finally found a way to reproduce the issue in-game, I opened the console and selected both copies of the boat. The console reported that they had the same reference form id. Everything I knew about the original Oblivion game engine told me that this should be impossible. It seemed like the Unreal Engine side of the game engine had mistakenly duplicated the boat reference and this violation was breaking all of my scripts which were all built on the assumption that only one in-game object could have the same reference id.

Since this issue seemed to be on the Unreal Engine side of the game engine, I had no choice but to dive into the world of UE4SS lua scripting which would give me access to fiddle around with the internals of the Unreal Engine part of the game.

The [full UE4SS script I wrote to fix the duplication issue is here]([RowYourBoat/UE4SSScripts/main.lua at 53930b86f011110ec30569f261d51e7bdc8e21e3 · thallada/RowYourBoat · GitHub](https://github.com/thallada/RowYourBoat/blob/53930b86f011110ec30569f261d51e7bdc8e21e3/UE4SSScripts/main.lua)). Essentially, I used the [`NotifyOnNewObject`](https://docs.ue4ss.com/lua-api/global-functions/notifyonnewobject.html) to constantly keep track of new objects getting created in Unreal Engine. If any of the items matches the class for my rowboat or any of its attachments, then I immediately delete the duplicate copies. In my testing this seemed to work pretty well, and in most cases the cleanup happened so seamlessly the player would likely not notice it happening. With the duplicates deleted, my OBScript scripts continued to operate correctly.

I never truly found out the root-cause of the duplicating boats. The process I followed to consistently reproduce the bug involved:

1. Move the boat outside the original cell it was placed in (outside the Imperial City Waterfront District).
2. Leave the boat in the new cell and then move the player to a new different cell far away from the boat.
3. Come back to the boat and row it back to the original cell it was placed in by the shack in the Waterfront District.

So, I suspect it has something to do with Unreal Engine getting Construction Set placed references mixed up with references that have been moved by scripts outside their originally placed cell, and somehow duplicating the reference in the process.

I haven’t gotten any reports from users that the boat duplication bug is still happening after I released a new version with the UE4SS script. I still get the occasional user reporting crashes that happen, but it’s hard to prove what mod in their load order is really causing the crash, and many users report my mod because they see the log messages my script writes in their UE4SS logs. Personally, I didn’t experience any crashes with a bare-bones load order with just my mod and it’s dependencies installed.

### Future Work

Unless I get infatuated with Oblivion modding again, I don’t think I’ll be adding anything more to the mod anytime soon. But, if I were to, I think there’s a lot more I could add to improve the mod:

- Add a controllable pirate ship with explorable interiors
- Add a sailing mechanic like [Valheim’s sailing](https://valheim.fandom.com/wiki/Boats#Sailing_with_the_wind) where you have to constantly adjust the sails to favor the current winds
- Allow hiring ship crew to help you out on the deck
- Add durability to the boats so crashing full-speed into a rock has consequences
  - Allow players to spend resources to repair the boat or pay someone to repair it for them
- Add animated oars that move through the water as the player rows
- Add rowing sounds that play when the player is rowing
- Add proper follower support by giving them a place to sit or stand on the boat while it’s moving
- Boat crafting
- Fix the boat floating above water in some interior/city worldspace cells
  - This would require a way to query the water height of the current cell. Hopefully OBSE64 eventually adds this 🤞.
- (probably a different mod) add a fishing mechanic so you can fish off the boat
- (probably a different mod) add a cart mod
  - The dragging mechanic I added for this mod I think could be applied to carts on land. E.g. attaching a cart to your horse to get extra carrying capacity
