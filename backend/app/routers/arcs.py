from fastapi import APIRouter, HTTPException, status
from app.data import arcs
from app.utils.helpers import find_item_by_id
from app.schemas import Arc


router = APIRouter()

@router.get("/arcs", response_model=list[Arc])
def get_arcs(name: str | None = None, characters: str | None = None, status: str | None = None, continuity: str | None = None, episode_range: str | None = None, chapter_range: str | None = None,):

  filtered_results = []

  episode_ranges = { "Episodes 1-12": (1, 12), "Episodes 13-24": (13, 24), "Episodes 25-37": (25, 37), "Episodes 38-51": (38, 51),}
  chapter_ranges = {"Chapters 0-25": (0, 25), "Chapters 26-50": (26, 50), "Chapters 51-75": (51, 75), "Chapters 76-100": (76, 100),"Chapters 101-113": (101, 113),}

  for arc in arcs:
    is_match = True

    if name is not None:
      if name.lower() not in arc.get("name", "").lower():
        is_match = False

    if status is not None:
      if status.lower() not in arc.get("status", "").lower():
        is_match = False

    if characters is not None:
      found_character = False
      search_name = characters.lower()

      for character_name in arc.get("main_characters", []):
        if search_name in character_name.lower():
          found_character = True
          break

      if not found_character:
        is_match = False

    if continuity is not None:
      episodes = arc.get("episodes")
      manga_chapters = arc.get("manga_chapters")

      if continuity.lower() == "anime and manga":
        if episodes is None or manga_chapters is None:
          is_match = False
      elif continuity.lower() == "anime only":
        if episodes is None or manga_chapters is not None:
          is_match = False
      elif continuity.lower() == "manga only":
        if episodes is not None or manga_chapters is None:
          is_match = False
      else:
        is_match = False

    if episode_range is not None:
      selected_range = episode_ranges.get(episode_range)
      episodes = arc.get("episodes")

      if selected_range is None or episodes is None:
        is_match = False
      else:
        first_episode = int(episodes.split("-")[0])
        range_start, range_end = selected_range

        if first_episode < range_start or first_episode > range_end:
          is_match = False

    if chapter_range is not None:
      selected_range = chapter_ranges.get(chapter_range)
      manga_chapters = arc.get("manga_chapters")

      if selected_range is None or manga_chapters is None:
        is_match = False
      else:
        first_chapter = float(manga_chapters.split("-")[0])
        range_start, range_end = selected_range

        if first_chapter < range_start or first_chapter > range_end:
          is_match = False

    if is_match:
      filtered_results.append(arc)

  return filtered_results

@router.get("/arcs/{arc_id}", response_model=Arc)
def get_arc_by_id(arc_id: int): 
  return find_item_by_id(arcs, arc_id, "Arc not found")