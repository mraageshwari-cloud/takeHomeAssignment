import vanitynumber
import itertools

# --------------------------------------------
# Custom fallback vanity number generator
# --------------------------------------------
PHONE_MAP = {
    "2": "ABC", "3": "DEF",
    "4": "GHI", "5": "JKL",
    "6": "MNO", "7": "PQRS",
    "8": "TUV", "9": "WXYZ"
}

def generate_custom_vanity_numbers(phone_number, limit=5):
    """
    Generate fallback vanity numbers using digits-to-letters mapping.
    Only maps the last 4 digits for performance.
    """
    # remove non-digits
    digits = "".join([d for d in phone_number if d.isdigit()])

    # For simplicity we turn only the last 4 digits into letters
    base = digits[:-7]
    tail = digits[-7:]

    # Build letter groups for last 4 digits
    letter_groups = []
    for d in tail:
        if d in PHONE_MAP:
            letter_groups.append(PHONE_MAP[d])
        else:
            letter_groups.append(d)

    # Generate combinations
    combos = itertools.product(*letter_groups)

    results = []
    for combo in combos:
        vanity_tail = "".join(combo)
        results.append(base + vanity_tail)
        if len(results) >= limit:
            break

    return results


# --------------------------------------------
# Main logic that ensures exactly 5 results
# --------------------------------------------
def get_vanity_numbers(number):
    # Try package first
    try:
        results = vanitynumber.all_wordifications(number)
    except Exception:
        results = []

    # CASE 1 — Package returned ≥ 5  
    if len(results) >= 5:
        return results[:5]

    # CASE 2 — Package returned 1–4 → need custom to generate the rest
    if 1 <= len(results) < 5:
        needed = 5 - len(results)
        custom = generate_custom_vanity_numbers(number, limit=needed)
        return results + custom

    # CASE 3 — Package returned 0 → fully fallback to custom
    if len(results) == 0:
        return generate_custom_vanity_numbers(number, limit=5)



number = "13129751170"
first_five = get_vanity_numbers(number)

print("Input:", number)
print("First 5 Vanity Numbers:")
for v in first_five:
    print(v)
