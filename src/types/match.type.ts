export interface IMatchData {
    ymd: string;
    schedule_key: string;
    left_team: string;
    right_team: string;
    card: string;
  }
  
export interface IGameData {
  schedule_key: string;
  season: string;
  player_id: string;
  no: string;
  player: string;
  team_id: string;
  team: string;
  starter: string;
  min: string;
  f3gm: string;
  f3ga: string;
  f3gp: string;
  f2gm: string;
  f2ga: string;
  f2gp: string;
  fgm: string;
  fga: string;
  fgp: string;
  ftm: string;
  fta: string;
  ftp: string;
  orb: string;
  drb: string;
  trb: string;
  ast: string;
  stl: string;
  blk: string;
  tov: string;
  pf: string;
  paint_f2gm: string;
  paint_f2ga: string;
  paint_f2gp: string;
  fb: string;
  pot: string;
  pts: string;
}