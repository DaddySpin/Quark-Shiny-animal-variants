let shinyAnimalChance = 2048

function isShiny(uuid) {
    if (shinyAnimalChance <= 0) return false;
    
    let uuidStr = uuid.toString().replace(/-/g, '')
    let mostSignificantHex = uuidStr.substring(0, 16)
    
    let most = parseInt(mostSignificantHex.substring(8), 16)
    
    return most % shinyAnimalChance === 0;
}

EntityEvents.spawned(event => {
    let entity = event.entity

    for (let mob of global.shiny_entities) {
        if (entity.type == mob) {
            let mob_id = entity.type.split(":")[1]
            
            if (isShiny(entity.uuid)) {
                entity.setSyncedData("shiny", `${mob_id}`)
                console.log(`Shiny ${mob_id} spawned with UUID: ${entity.uuid.toString()}`)
            }
        }
    }   
})