import json
import re
from pathlib import Path

RAW_PATH = Path("raw.txt")
OUTPUT_PATH = Path("devils.json")
LINE_PATTERN = re.compile(r"^\s*\d+\.\s*(.*?)\s+Devil\s*$")


def extract_devils(raw_path: Path) -> list[str]:
    devils: list[str] = []
    with raw_path.open("r", encoding="utf-8") as file:
        for line in file:
            match = LINE_PATTERN.match(line)
            if match:
                devils.append(match.group(1))
    return devils


def save_devils(devils: list[str], output_path: Path) -> None:
    output_path.write_text(json.dumps(devils, ensure_ascii=False), encoding="utf-8")


def main() -> int:
    save_devils(extract_devils(RAW_PATH), OUTPUT_PATH)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        raise SystemExit(130)
