use starknet::ContractAddress;

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
pub enum SeedColor {
    None,
    Blue,
    Green,
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
pub enum GameStatus {
    Pending: (),
    InProgress: (),
    Finished: (),
    Forfeited: (),
    TimeOut: (),
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct GameCounter {
    #[key]
    pub id: u32,
    pub count: u128,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Board {
    #[key]
    pub game_id: u128,
    pub player: ContractAddress,
    pub last_move: u64,
    pub status: GameStatus
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub game_id: u128,
    #[key]
    pub address: ContractAddress,
    pub player_level: u8,
    pub restart_requested: bool
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Level {
    #[key]
    pub game_id: u128,
    #[key]
    pub player: ContractAddress,
    #[key]
    pub level_number: u8,
    pub tile_count: u8,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Tile {
    #[key]
    pub game_id: u128,
    #[key]
    pub player: ContractAddress,
    #[key]
    pub level_number: u8,
    #[key]
    pub tile_number: u8,
}