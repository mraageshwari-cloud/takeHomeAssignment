import json
import boto3
import vanitynumber
import itertools
import os



# Initialize DynamoDB client
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Vanity_Numbers")

# --------------------------------------------
# T9 mapping for fallback custom vanity numbers
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
    Only maps the last 7 digits for performance.
    """
    # Remove non-digits
   
    digits = "".join([d for d in phone_number if d.isdigit()])

    # Split into base and tail
    base = digits[:-7]
    tail = digits[-7:]

    # Build letter groups for T9 mapping
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
# Generate top 5 vanity numbers
# --------------------------------------------
def get_vanity_numbers(number):
    try:
        results = vanitynumber.all_wordifications(number)
    except Exception as e:
        print("Error in vanitynumber:", str(e))
        results = []
    print("results",results)
    if len(results) >= 5:
        return results[:5]
    elif 1 <= len(results) < 5:
        needed = 5 - len(results)
        custom = generate_custom_vanity_numbers(number, limit=needed)
        return results + custom
    else:
        return generate_custom_vanity_numbers(number, limit=5)

# --------------------------------------------
# Lambda handler
# --------------------------------------------


def lambda_handler(event, context):
   
    caller_number = event["Details"]["ContactData"]["CustomerEndpoint"]["Address"]

    if not caller_number:
        return {"statusCode": 400, "body": "Missing caller_number in event"}

    try:
        # Check if the caller_number already exists
        response = table.get_item(
            Key={"Caller_Number": caller_number}
        )
        if "Item" in response:
            # Found existing entry, return stored vanity numbers
            top_five = response["Item"]["Vanity_Numbers"]
            return {
                "statusCode": 200,
                "body": {
                    "caller_number": caller_number,
                    "top_vanity_numbers": top_five
                    
                }
            }

        # If not found, generate vanity numbers
        top_five = get_vanity_numbers(caller_number)
        print("Generated top five vanity numbers:", top_five)

        # Save new entry to DynamoDB
        table.put_item(
            Item={
                "Caller_Number": caller_number,
                "Vanity_Numbers": top_five
            }
        )

        return {
            "statusCode": 200,
            "body": {
                "caller_number": caller_number,
                "top_vanity_numbers": top_five,
                "source": "generated"
            }
        }

    except Exception as e:
        print("Error accessing DynamoDB:", str(e))
        return {"statusCode": 500, "body": str(e)}



