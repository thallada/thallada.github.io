---
title: "Modmapper: Putting every Skyrim mod on a map with Rust"
layout: post
image: /img/blog/modmapper.jpg
hidden: true
---

[Modmapper](https://modmapper.com) is a website that I made that puts every mod 
for the game [Elder Scrolls V: 
Skyrim](https://en.wikipedia.org/wiki/The_Elder_Scrolls_V:_Skyrim) uploaded to 
[Nexus Mods](https://www.nexusmods.com/) on an interactive map.

<a href="https://modmapper.com" target="_blank">
    ![Screenshot of modmapper.com](/img/blog/modmapper.jpg)
</a>

You can view the map at [https://modmapper.com](https://modmapper.com).

Released in 2011, Skyrim is over a decade old now. But, its vast modding 
community has kept it alive and relevant to this day. [Skyrim is still in the 
top 50 games being played on Steam in 2022](https://steamcharts.com/top/p.2) and 
I think it's no coincidence that [it's also one of the most modded games 
ever](https://www.nexusmods.com/games?).

<!--excerpt-->

The enormous and enduring modding community around the Elder Scrolls games is 
why I have a special fondness for the series. I was 13 when I first got 
interested in programming through [making mods for Elder Scrolls IV: 
Oblivion](https://www.nexusmods.com/users/512579?tab=user+files&BH=2). I quickly 
realized I got way more satisfaction out of modding the game than actually 
playing it. I was addicted to being able to create whatever my mind imagined in 
my favorite game.

I was working on mod for Skyrim earlier in the year[^bazaarrealm] and was 
looking for the best places to put new buildings in the game world. I really 
wanted areas of the game world off the beaten (heavily-modded) path. After over 
a decade of modifications, there could be conflicts with hundreds of mods in any 
area I chose which could cause issues like multiple buildings overlapping or 
terrain changes causing floating rocks and trees.

<p>
    <div class="row">
        <figure>
            <img alt="Example of a conflict between two mods that both chose the 
            same spot to put a lamp post and sign post so they are clipping" 
            src="/img/blog/modmapper-clipping-example2.jpg" />
            <figurecaption>
                <em>
                    Example of a conflict between two mods that both chose the same 
                    spot to put a lamp post and sign post so they are clipping. 
                    Screenshot by <a 
                    href="https://www.nexusmods.com/users/63732336">
                    AndreySG</a>
                </em>
            </figurecaption>
        </figure>
        <figure>
            <img alt="Example of a conflict between two mods that both chose the 
            same spot to put a building and rock so they are clipping" 
            src="/img/blog/modmapper-clipping-example1.jpg" />
            <figurecaption>
                <em>
                    Example of a conflict between two mods that both chose the same 
                    spot to put a building and rock so they are clipping. Screenshot 
                    by <a href="https://www.reddit.com/user/LewdManoSaurus">
                    LewdManoSaurus</a>
                </em>
            </figurecaption>
        </figure>
        <figure>
            <img alt="Example of a conflict between two mods that both chose the 
            same spot to put a building and tree so they are clipping" 
            src="/img/blog/modmapper-clipping-example3.jpg" />
            <figurecaption>
                <em>
                    Example of a conflict between two mods that both chose the same 
                    spot to put a building and tree so they are clipping. Screenshot 
                    by <a 
                    href="https://www.nexusmods.com/skyrimspecialedition/users/51448566">
                    Janquel</a>
                </em>
            </figurecaption>
        </figure>
        <figure>
            <img alt="Example of a conflict between two mods that both chose the 
            same spot to put a woodcutting mill" 
            src="/img/blog/modmapper-clipping-example4.jpg" />
            <figurecaption>
                <em>
                    Example of a conflict between two mods that both chose the 
                    same spot to put a woodcutting mill so they are clipping. 
                    Screenshot by <a 
                    href="https://www.nexusmods.com/skyrimspecialedition/users/51448566">
                    Janquel</a>
                </em>
            </figurecaption>
        </figure>
    </div>
</p>

Mod authors usually use a tool like 
[TES5Edit](https://www.nexusmods.com/skyrim/mods/25859) to analyze a group of 
mod plugins to find conflicts and create patches to resolve them on a 
case-by-case basis. But, I was unsatisfied with that. I wanted to be assured 
that there would be no conflicts, or at least know the set of all possible mods 
out there that could conflict so I could manually patch those few mods. There 
was no good solution for finding conflicts across all mods though. Mod authors 
would need to download every Skyrim mod ever and no one has time to download all 
85,000+ Skyrim mods, and no one has the computer memory to load all of those in 
TES5Edit at the same time.

Through that frustration, Modmapper was born with the mission to create a 
database of all Skyrim mod exterior cell edits. With that database I can power 
the website which visualizes how popular cells are in aggregate as well as allow 
the user to drill down to individual cells, mods, or plugins to find potential 
conflicts without ever having to download files themselves.

When I [released the website about 7 months 
ago](https://www.reddit.com/r/skyrimmods/comments/sr8k4d/modmapper_over_14_million_cell_edits_from_every/) 
it made a big splash in the Skyrim modding community. No one had ever visualized 
mods on a map like this before, and it gave everyone a new perspective on the 
vast library of Skyrim mods. It was even [featured on the front page of PC 
Gamer's 
website](https://www.pcgamer.com/skyrim-modmapper-is-a-weirdly-beautiful-way-to-manage-your-mods/). 
Thirteen-year-old me, who regularly read the monthly PC Gamer magazine, would 
have been astounded.

<a 
href="https://www.pcgamer.com/skyrim-modmapper-is-a-weirdly-beautiful-way-to-manage-your-mods/" 
target="_blank">
    ![Screenshot of PC Gamer article titled "Skyrim Modmapper is a weirdly 
    beautiful way to manage your mods" by Robert Zak published April 20, 
    2022](/img/blog/modmapper-pcgamer.jpg)
</a>

The comments posted to the initial mod I posted on Nexus Mods[^takedown] for the 
project were very amusing. It seemed to be blowing their minds:

> "Quite possibly this could be the best mod for 
Skyrim. This hands-down makes everyone's life easier to be able to see which of 
their mods might be conflicting." -- [Nexus Mods comment by 
lorddonk](/img/blog/modmapper-comment15.png)

> "The 8th wonder of Skyrim. That's a Titan's work requiring a monk's 
> perserverance. Finally, a place to go check (in)compatibilities !!! Voted. 
> Endorsed." -- [Nexus Mods comment by 
> jfjb2005](/img/blog/modmapper-comment3.png)

> "They shall sing songs of your greatness! Wow, just wow." -- [Nexus Mods 
> comment by 
LumenMystic](/img/blog/modmapper-comment7.png)

> "Holy Batman Tits! Be honest..... You're a Govt Agent and made this mod during 
> your "Terrorist Watch Shift" using a CIA super computer.." -- [Nexus Mods 
comment by toddrizzle](/img/blog/modmapper-comment1.png)

> "What drugs are you on and can I have some?" -- [Nexus Mods comment by 
> thappysnek](/img/blog/modmapper-comment11.png)

> "This is madness! Author are some kind of overhuman?! GREAT work!"-- [Nexus 
> Mods comment by TeodorWild](/img/blog/modmapper-comment10.png)

> "You are an absolute legend. Bards will sing tales of your exploits" -- [Nexus 
> Mods comment by burntwater](/img/blog/modmapper-comment2.png)

> "I wanted to say something, but I'll just kneel before thee and worship. This 
> would have taken me a lifetime. Amazing." -- [Nexus Mods comment by 
> BlueGunk](/img/blog/modmapper-comment8.png)

> "Finally found the real dragonborn" -- [Nexus Mods comment by 
> yag1z](/img/blog/modmapper-comment6.png)

> "he is the messiah!" -- [Nexus Mods comment by 
> Cursedobjects](/img/blog/modmapper-comment12.png)

> "A god amongst men." -- [Nexus Mods comment by 
> TheMotherRobbit](/img/blog/modmapper-comment13.png)

Apparently knowing how to program is now a god-like ability! This is the type of 
feedback most programmers aspire to get from their users. I knew the tool was 
neat and fun to build, but I didn't realize it was *that* sorely needed by the 
community.

Today, Modmapper has a sustained user-base of around 7.5k unique visitors a 
month[^analytics] and I still see it mentioned in reddit threads or discord 
servers whenever someone is asking about the places a mod edits or what mods 
might be conflicting in a particular cell.

The rest of this blog post will delve into how I built the website and how I 
gathered all of the data necessary to display the visualization.

### Downloading ALL THE MODS!

![Meme with the title "DOWNLOAD ALL THE MODS!"](/img/blog/allthemods.jpg)

In order for the project to work I needed to collect all the Skyrim mod plugin 
files.

While there are a number of places people upload Skyrim mods, [Nexus 
Mods](https://nexusmods.com) is conveniently the most popular and has the vast 
majority of mods. So, I would only need to deal with this one source. Luckily, 
[they have a nice API 
handy](https://app.swaggerhub.com/apis-docs/NexusMods/nexus-mods_public_api_params_in_form_data/1.0). 

[modmapper](https://github.com/thallada/modmapper) is the project I created to 
do this. It is a Rust binary that:

* Uses [reqwest](https://crates.io/crates/reqwest) to make requests to [Nexus 
  Mods](https://nexusmods.com) for pages of last updated mods.
* Uses [scraper](https://crates.io/crates/scraper) to scrape the HTML for 
  individual mod metadata (since the Nexus API doesn't provide an endpoint to 
  list mods).
* Makes requests to the Nexus Mods API to get file and download information for 
  each mod, using [serde](https://serde.rs/) to parse the 
  [JSON](https://en.wikipedia.org/wiki/JSON) responses.
* Requests the content preview data for each file and walks through the list of 
  files in the archive looking for a Skyrim plugin file (`.esp`, `.esm`, or 
  `.esl`).
* If it finds a plugin, it decides to download the mod. It hits the download API 
  to get a download link and downloads the mod file archive.
* Then it extracts the archive using one of: 
  [compress_tools](https://crates.io/crates/compress-tools), 
  [unrar](https://crates.io/crates/unrar), or [7zip](https://www.7-zip.org/) via 
  [`std::process::Commmand`](https://doc.rust-lang.org/std/process/struct.Command.html) 
  (depending on what type of archive it is).
* With the ESP files (Elder Scrolls Plugin files) extracted, I then use my 
  [skyrim-cell-dump](https://github.com/thallada/skyrim-cell-dump) library (more 
  on that later!) to extract all of the cell edits into structured data.
* Uses [seahash](https://crates.io/crates/seahash) to create a fast unique hash 
  for plugin files.
* It then saves all of this data to a [postgres](https://www.postgresql.org/) 
  database using the [sqlx crate](https://crates.io/crates/sqlx).
* Uses extensive logging with the [tracing 
  crate](https://crates.io/crates/tracing) so I can monitor the output and have 
  a history of a run to debug later if I discover an issue.

It is designed to be run as a nightly [cron](https://en.wikipedia.org/wiki/Cron) 
job which downloads mods that have updated on Nexus Mods since the last run.

To keep costs for this project low, I decided to make the website entirely 
static. So, instead of creating an API server that would have to be constantly 
running to serve requests from the website by making queries directly to the 
database, I would dump all of the data that the website needed from the database 
to JSON files, then upload those files to [Amazon 
S3](https://aws.amazon.com/s3/) and serve them through the [Cloudflare 
CDN](https://www.cloudflare.com/cdn/) which has servers all over the world.

So, for example, every mod in the database has a JSON file uploaded to 
`https://mods.modmapper.com/skyrimspecialedition/<nexus_mod_id>.json` and the 
website frontend will fetch that file when a user clicks a link to that mod in 
the UI.

The cost for S3 is pretty reasonable to me ($~3.5/month), and Cloudflare has a 
[generous free tier](https://www.cloudflare.com/plans/#price-matrix) that allows 
me to host everything through it for free.

The server that I actually run `modmapper` on to download all of the mods is a 
server I already have at home that I also use for other purposes. The output of 
each run is uploaded to S3, and I also make a full backup of the database and 
plugin files to [Dropbox](https://www.dropbox.com).

A lot of people thought it was insane that I downloaded every mod[^adult-mods],
but in reality it wasn't too bad once I got all the issues resolved in
`modmapper`. I just let it run in the background all day and it would chug
through the list of mods one-by-one. Most of the time ended up being spent
waiting while the Nexus Mod's API hourly rate limit was reached on my
account.[^rate-limit] 

As a result of this project I believe I now have the most complete set of all 
Skyrim plugins to date (extracted plugins only without other textures, models, 
etc.)[^plugin-collection]. Compressed, it totals around 99 GB, uncompressed: 191 
GB.

[After I downloaded Skyrim Classic mods in addition to Skyrim Special 
Edition](#finishing-the-collection-by-adding-all-skyrim-classic-mods), here are 
some counts from the database:

|:---|:---|
| **Mods** | 113,028 |
| **Files** | 330,487 |
| **Plugins** | 534,831 |
| **Plugin Cell Edits** | 33,464,556 |

### Parsing Skyrim plugin files

The Skyrim game engine has a concept of 
[worldspaces](https://en.uesp.net/wiki/Skyrim:Worldspaces) which are exterior 
areas where the player can travel to. The biggest of these being, of course, 
Skyrim itself (which, in the lore, is a province of the continent of 
[Tamriel](https://en.uesp.net/wiki/Lore:Tamriel) on the planet 
[Nirn](https://en.uesp.net/wiki/Lore:Nirn)). Worldspaces are recorded in a 
plugin file as [WRLD 
records](https://en.uesp.net/wiki/Skyrim_Mod:Mod_File_Format/WRLD).

Worldspaces are then chunked up into a square grid of cells. The Skyrim 
worldspace consists of a little over 11,000 square cells. Mods that make a 
changes to the game world have a record in the plugin (a [CELL 
record](https://en.uesp.net/wiki/Skyrim_Mod:Mod_File_Format/CELL)) with the 
cell's X and Y coordinates and a list changes in that cell.

There is some prior art ([esplugin](https://github.com/Ortham/esplugin), 
[TES5Edit](https://github.com/TES5Edit/TES5Edit), 
[zedit](https://github.com/z-edit/zedit)) of open-source programs that could 
parse Skyrim plugins and extract this data. However, all of these were too broad 
for my purpose or relied on the assumption of being run in the context of a load 
order where the master files of a plugin would also be available. I wanted a 
program that could take a single plugin in isolation and skip through all of the 
non-relevant parts of it and dump just the CELL and WRLD record data plus some 
metadata about the plugin from the header as fast as possible.

After discovering [the wonderful documentation on the UESP wiki about the Skyrim 
mod file format](https://en.uesp.net/wiki/Skyrim_Mod:Mod_File_Format), I 
realized this would be something that would be possible to make myself. 
[skyrim-cell-dump](https://github.com/thallada/skyrim-cell-dump) is a Rust 
library/CLI program that accepts a Skyrim mod file and spits out the header 
metadata of the plugin, the worlds edited/created, and all of the cells it 
edits/creates.

Under the hood, it uses the [nom crate](https://crates.io/crates/nom) to read 
through the plugin until it finds the relevant records, then uses 
[flate2](https://crates.io/crates/flate2) to decompress any compressed record 
data, and finally outputs the extracted data formatted to JSON with 
[serde](https://crates.io/crates/serde).

Overall, I was pretty happy with this toolkit of tools and was able to quickly 
get the data I needed from plugins. My only gripe was that I never quite figured 
out how to properly do error handling with nom. If there was ever an error, I 
didn't get much data in the error about what failed besides what function it 
failed in. I often had to resort to peppering in a dozen `dbg!()` statements to 
figure out what went wrong.

I built it as both a library and binary crate so that I could import it in other 
libraries and get the extracted data directly as Rust structs without needing to 
go through JSON. I'll go more into why this was useful later.

### Building the website

Since I wanted to keep server costs low and wanted the site to be as fast as 
possible for users, I decided pretty early on that the site would be purely 
static HTML and JavaScript with no backend server. I decided to use the [Next.js 
web framework](https://nextjs.org/) with 
[TypeScript](https://www.typescriptlang.org/) since it was what I was familiar 
with using in my day job. While it does have [server-side rendering 
support](https://nextjs.org/docs/basic-features/pages#server-side-rendering) 
which would require running a backend [Node.js](https://nodejs.org/en/) server, 
it also supports a limited feature-set that can be [exported as static 
HTML](https://nextjs.org/docs/advanced-features/static-html-export).

I host the site on [Cloudflare pages](https://pages.cloudflare.com/) which is 
available on their free tier and made deploying from Github commits a 
breeze[^cloudflare]. The web code is in my [modmapper-web 
repo](https://github.com/thallada/modmapper-web).

The most prominent feature of the website is the interactive satellite map of 
Skyrim. Two essential resources made this map possible: [the map tile images 
from the UESP skyrim map](https://srmap.uesp.net/) and 
[Mapbox](https://www.mapbox.com/).

[Mapbox provides a JS library for its WebGL 
map](https://docs.mapbox.com/mapbox-gl-js/api/) which allows specifying a 
[raster tile 
source](https://docs.mapbox.com/mapbox-gl-js/example/map-tiles/)[^3d-terrain].

The [UESP team painstakingly loaded every cell in the Skyrim worldspace in the 
Creation Kit and took a 
screenshot](https://en.uesp.net/wiki/UESPWiki:Skyrim_Map_Design). Once I figured 
out which image tiles mapped to which in-game cell it was relatively easy to put 
a map together by plugging them into the Mapbox map as a raster tile source.

The heatmap overlaid on the map is created using a [Mapbox 
layer](https://docs.mapbox.com/help/glossary/layer/) that fills a cell with a 
color on a gradient from green to red depending on how many edits that cell has 
across the whole database of mods.

![Screenshot closeup of modmapper.com displaying a grid of colored cells from 
green to red overlaid atop a satellite map of 
Skyrim](/img/blog/modmapper-heatmap-closeup.jpg)

The sidebar on the site is created using [React](https://reactjs.org/) and 
[Redux](https://redux.js.org/) and uses the 
[next/router](https://nextjs.org/docs/api-reference/next/router) to keep track 
of which page the user is on with URL parameters.

<p>
    <div class="row">
        <img alt="Screenshot of modmapper.com sidebar with a cell selected" 
        src="/img/blog/modmapper-cell-sidebar.jpg" class="half-left" />
        <img alt="Screenshot of modmapper.com sidebar with a mod selected"
        src="/img/blog/modmapper-mod-sidebar.jpg" class="half-right" />
    </div>
</p>

The mod search is implemented using 
[MiniSearch](https://lucaong.github.io/minisearch/) that asynchronously loads 
the giant search indices for each game containing every mod name and id.

![Screenshot of modmapper.com with "trees" entered into the search bar with a 
number of LE and SE mod results listed underneath in a 
dropdown](/img/blog/modmapper-search.jpg)

One of the newest features of the site allows users to drill down to a 
particular plugin within a file of a mod and "Add" it to their list. All of the 
added plugins will be listed in the sidebar and the cells they edit displayed in 
purple outlines and conflicts between them displayed in red outlines.

![Screenshot of modmapper.com with 4 Added Plugins and the map covered in purple 
and red boxes](/img/blog/modmapper-added-plugins.jpg)

### Loading plugins client-side with WebAssembly

A feature that many users requested after the initial release was being able to 
load a list of the mods currently installed on their game and see which ones of 
that set conflict with each other[^second-announcement]. Implementing this 
feature was one of the most interesting parts of the project. Choosing to use 
Rust made made it possible, since everything I was running server-side to 
extract the plugin data could also be done client-side in the browser with the 
same Rust code compiled to [WebAssembly](https://webassembly.org/).

I used [wasm-pack](https://github.com/rustwasm/wasm-pack) to create 
[skyrim-cell-dump-wasm](https://github.com/thallada/skyrim-cell-dump-wasm/) 
which exported the `parse_plugin` function from my 
[skyrim-cell-dump](https://github.com/thallada/skyrim-cell-dump) Rust library 
compiled to WebAssembly. It also exports a `hash_plugin` function that creates a 
unique hash for a plugin file's slice of bytes using 
[seahash](https://crates.io/crates/seahash) so the site can link plugins a user 
has downloaded on their hard-drive to plugins that have been downloaded by 
modmapper and saved in the database.

Dragging-and-dropping the Skyrim Data folder on to the webpage or selecting the 
folder in the "Open Skyrim Data directory" dialog kicks off a process that 
starts parsing all of the plugin files in that directory in parallel using [Web 
Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

I developed my own 
[`WorkerPool`](https://github.com/thallada/modmapper-web/blob/4af628559030c3f24618b29b46d4a40af2f200a6/lib/WorkerPool.ts) 
that manages creating a pool of available workers and assigns them to plugins to 
process. The pool size is the number of cores on the user's device so that the 
site can process as many plugins in parallel as possible. After a plugin 
finishes processing a plugin and sends the output to the redux store, it gets 
added back to the pool and is then assigned a new plugin to process if there are 
any[^wasm-troubles].

Once all plugins have been loaded, the map updates by displaying all of the 
cells edited in a purple box and any cells that are edited by more than one 
plugin in a red box.

![Screenshot of modmapper.com with 74 Loaded Plugins and the map filled with 
purple and red boxes](/img/blog/modmapper-loaded-plugins.jpg)

Users can also drag-and-drop or paste their `plugins.txt` file, which is the 
file that the game uses to define the load order of plugins and which plugins 
are enabled or disabled. Adding the `plugins.txt` sorts the list of loaded 
plugins in the sidebar in load order and enables or disables plugins as defined 
in the `plugins.txt`.

![Screenshot of modmapper.com with the Paste plugins.txt dialog 
open](/img/blog/modmapper-pluginstxt-dialog.jpg)

Selecting a cell in the map will display all of the loaded cells that edit that 
cell in the sidebar.

![Screenshot of modmapper.com with a conflicted cell selected on the map and 4 
Loaded Plugins displayed](/img/blog/modmapper-conflicted-cell.jpg)

The ability to load plugins straight from a user's hard-drive allows users to 
map mods that haven't even been uploaded to Nexus Mods.

### Vortex integration

The initial mod I released on the Skyrim Special Edition page of Nexus Mods was 
[taken 
down](https://www.reddit.com/r/skyrimmods/comments/svnz4a/modmapper_got_removed/) 
by the site admins since it didn't contain an actual mod and they didn't agree 
that it qualified as a "Utility".

Determined to have an actual mod page for Modmapper on Nexus Mods, I decided to 
make a [Vortex](https://www.nexusmods.com/about/vortex/) integration for 
modmapper. Vortex is a mod manager made by the developers of Nexus Mods and they 
allow creating extensions to the tool and have their own [mod section for Vortex 
extensions](https://www.nexusmods.com/site).

With the help of [Pickysaurus](https://www.nexusmods.com/skyrim/users/31179975), 
one of the community managers for Nexus Mods, I created a [Vortex integration 
for Modmapper](https://www.nexusmods.com/site/mods/371). It adds a context menu 
option on mods to view the mod in Modmapper with all of the cells it edits 
selected in purple. It also adds a button next to every plugin file to view just 
that plugin in Modmapper (assuming it has been processed by Modmapper).

<p>
    <div class="row">
        <img alt="Screenshot of Vortex mod list with a mod context menu open which 
        shows a 'See on Modmapper' option" 
        src="/img/blog/modmapper-vortex-mod-menu.jpg" class="half-left" />
        <img alt="Screenshot of Vortex plugin list with 'See on Modmapper' buttons 
        on the right of each plugin row"
        src="/img/blog/modmapper-vortex-plugin-button.jpg" class="half-right" />
    </div>
</p>

To enable the latter part, I had to include `skyrim-cell-dump-wasm` in the 
extension so that I could hash the plugin contents with `seahash` to get the 
same hash that Modmapper would have generated. It only does this hashing when 
you click the "See on Modmapper" button to save from excessive CPU usage when 
viewing the plugin list.

After releasing the Vortex plugin, Pickysaurus [published a news article about 
modmapper to the Skyrim Special Edition 
site](https://www.nexusmods.com/skyrimspecialedition/news/14678) which also got 
a lot of nice comments ❤️.

### Finishing the collection by adding all Skyrim Classic mods

Skyrim is very silly in that it has [many 
editions](https://ag.hyperxgaming.com/article/12043/every-skyrim-edition-released-over-the-last-decade). 
But there was only one that split the modding universe into two: [Skyrim Special 
Edition (SE)](https://en.uesp.net/wiki/Skyrim:Special_Edition).
It was released in October 2016 with a revamped game engine that brought some 
sorely needed graphical upgrades. However, it also contained changes to how mods 
worked, requiring all mod authors to convert their mods to SE. This created big 
chasm in the library of mods, and Nexus Mods had to make a separate section for 
SE-only mods.

When I started downloading mods in 2021, I started only with Skyrim SE mods, 
which, at the time of writing, totals at over [55,000 mods on Nexus 
Mods](https://www.nexusmods.com/skyrimspecialedition/mods/).

After releasing with just SE mods, many users requested that all of the classic 
pre-SE Skyrim mods be added as well. This month, I finally finished downloading 
all Skyrim Classic mods, which, at the time of writing, totals at over [68,000 
mods on Nexus Mods](https://www.nexusmods.com/skyrim/mods/). That brings the 
total downloaded and processed mods for Modmapper at over 113,000 
mods[^adult-mods]!

### The future

A lot of users had great feedback and suggestions on what to add to the site. I 
could only implement so many of them, though. The rest I've been keeping track 
of on [this Trello board](https://trello.com/b/VdpTQ7ar/modmapper).

Some of the headline items on it are:

* Add [Solstheim map](https://dbmap.uesp.net/)

  Since map tiles images are available for that worldspace and because I have 
  already recorded edits to the worldspace in my database, it shouldn't be too 
  terribly difficult.
* Add [Mod Organizer 2](https://www.modorganizer.org/) plugin

  Lots of people requested this since it's a very popular mod manager compared 
  to Vortex. MO2 supports python extensions so I created 
  [skyrim-cell-dump-py](https://github.com/thallada/skyrim-cell-dump-py) to 
  export the Rust plugin processing code to a Python library. I got a bit stuck 
  on actually creating the plugin though, so it might be a while until I get to 
  that.
* Find a way to display interior cell edits on the map

  The map is currently missing edits to interior cells. Since almost all 
  interior cells in Skyrim have a link to the exterior world through a door 
  teleporter, it should be possible to map an interior cell edit to an exterior 
  cell on the map based on which cell the door leads out to.

  That will require digging much more into the plugin files for more data, and 
  city worldspaces will complicate things further. Then there's the question of 
  interiors with multiple doors to different exterior cells, or interior cells 
  nested recursively deep within many other interior cells.
* Create a standalone [Electron](https://www.electronjs.org) app that can run 
  outside the browser

  I think this would solve a lot of the issues I ran into while developing the 
  website. Since Electron has a Node.js process running on the user's computer 
  outside the sandboxed browser process, it gives me much more flexibility. It 
  could do things like automatically load a user's plugin files. Or just load 
  plugins at all wihtout having to deal with the annoying dialog that lies to 
  the user saying they're about to upload their entire Data folder hundreds of 
  gigabytes full of files to a server (I really wish the 
  [HTMLInputElement.webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory) 
  API would use the same underlying code as the [HTML Drag and Drop 
  API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) 
  which is a lot better).
* Improving the search 
  
  The mod search feature struggles the most with the static generated nature of 
  the site. I found it very hard to pack all of the necessary info for the 
  search index for all 100k+ mods (index for both SE and LE is around 6 MB). 
  Asynchronously loading the indices with MiniSearch keeps it from freezing up 
  the browser, but it does take a very long time to fully load. I can't help 
  think that there's a better way to shard the indices somehow and only fetch 
  what I need based on what the user is typing into the search.

To be clear, a lot of the Todos on the board are pipe-dreams. I may never get to 
them. This project is sustained purely by my motivation and self-interests and 
if something is too much of a pain to get working I'll just drop it.

There will also be future Elder Scrolls games, and [future Bethesda games based 
on roughly the same game engine](https://bethesda.net/en/game/starfield). It 
would be neat to create similar database for those games as the modding 
community develops in realtime.

Overall, I'm glad I made something of use to the modding community. I hope to 
keep the site running for as long as people are modding Skyrim (until the 
heat-death of the universe, probably).


<br>

--- 

#### Footnotes

[^bazaarrealm]:
    Unfortunately, I basically lost interest on the mod after working on 
    Modmapper. I might still write a blog post about it eventually since I did a 
    lot of interesting hacking on the Skyrim game engine to try to add some 
    asynchronous multiplayer aspects. [Project is here if anyone is curious in 
    the meantime](https://github.com/thallada/BazaarRealmPlugin).

[^takedown]:
    I sadly only have screenshots for some of the comments on that mod since it 
    was eventually taken down by the Nexus Mod admins. See explanation about 
    that in the [Vortex integration section](#vortex-integration).

[^analytics]:
    As recorded by Cloudflare's server side analytics, which may record a fair 
    amount of bot traffic. I suspect this is the most accurate number I can get 
    since most of my users probably use an ad blocker that blocks client-side 
    analytics.

[^adult-mods]:
    Every mod on Nexus Mods except for adult mods since the site restricts
    viewing adult mods to only logged-in users and I wasn't able to get my
    scraping bot to log in as a user.

[^rate-limit]:
    Apparently my mass-downloading did not go unnoticed by the Nexus Mod admins. 
    I think it's technically against their terms of service to automatically 
    download mods, but I somehow got on their good side and was spared the 
    ban-hammer. I don't recommend anyone else run modmapper themselves on the 
    entire site unless you talk to the admins beforehand and get the okay from 
    them.

[^plugin-collection]:
    If you would like access to this dataset of plugins to do some data-mining 
    please reach out to me at [tyler@hallada.net](mailto:tyler@hallada.net) 
    (Note: only contains plugins files, no models, textures, audio, etc.). I 
    don't plan on releasing it publicly since that would surely go against many 
    mod authors' wishes/licenses.

[^cloudflare]:
    I'm not sure I want to recommend anyone else use Cloudflare after [the whole 
    Kiwi Farms 
    debacle](https://www.theverge.com/2022/9/6/23339889/cloudflare-kiwi-farms-content-moderation-ddos). 
    I now regret having invested so much of the infrastructure in them. However, 
    I'm only using their free-tier, so at least I am a net-negative for their 
    business? I would recommend others look into 
    [Netlify](https://www.netlify.com/) or [fastly](https://www.fastly.com/) for 
    similar offerings to Cloudflare pages/CDN.

[^3d-terrain]:
    I also tried to add a [raster Terrain-DEM 
    source](https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-dem-v1/) 
    for rendering the terrain in 3D. I got fairly far [generating my own DEM RGB 
    tiles](https://github.com/syncpoint/terrain-rgb) from an upscaled [greyscale 
    heightmap](https://i.imgur.com/9RErBDo.png) [constructed from the LAND 
    records in Skyrim.esm](https://www.nexusmods.com/skyrim/mods/80692) (view it 
    [here](https://www.dropbox.com/s/56lffk021riil6h/heightmap-4x_foolhardy_Remacri_rgb.tif?dl=0)). 
    But, it came out all wrong: [giant cliffs in the middle of the 
    map](/img/blog/modmapper-terrain-cliff.jpg) and [tiny spiky lumps with big 
    jumps in elevation at cell boundaries](/img/blog/modmapper-bad-terrain.jpg). 
    Seemed like too much work to get right than it was worth it.

[^second-announcement]:
    [This was the announcement I posted to /r/skyrimmods for this feature](
https://www.reddit.com/r/skyrimmods/comments/ti3gjh/modmapper_update_load_plugins_in_your_load_order/)

[^wasm-troubles]:
    At first, I noticed a strange issue with re-using the same worker on 
    different plugins multiple times. After a while (~30 reuses per worker), the 
    processing would slow to a crawl and eventually strange things started 
    happening (I was listening to music in my browser and it started to pop and 
    crack). It seemed like the speed of processing increased exponentially to 
    the number of times the worker was reused. So, to avoid this, I had to make 
    the worker pool terminate and recreate workers after every plugin processed. 
    This ended up not being as slow as it sounds and worked fine. However, I 
    recently discovered that [wee_alloc, the most suggested allocator to use 
    with rust in wasm, has a memory leak and is mostly unmaintained 
    now](https://www.reddit.com/r/rust/comments/x1cle0/dont_use_wee_alloc_in_production_code_targeting/). 
    I switched to the default allocator and I didn't run into the exponentially 
    slow re-use problem. For some reason, the first run on a fresh tab is always 
    much faster than the second run, but subsequent runs are still fairly stable 
    in processing time.

