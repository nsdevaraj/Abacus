from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to http://localhost:3000")
        try:
            page.goto("http://localhost:3000", timeout=30000)
            page.wait_for_load_state("networkidle")
        except Exception as e:
            print(f"Failed to navigate: {e}")
            return

        print("Page loaded.")

        # Click "Senior" button
        try:
            senior_btn = page.locator('button:has-text("Senior")')
            senior_btn.click()
            print("Clicked Senior button.")
            time.sleep(2) # Wait for save

            # Take screenshot after change
            page.screenshot(path="verification/senior_mode.png")
            print("Screenshot saved to verification/senior_mode.png")

            # Reload
            print("Reloading page...")
            page.reload()
            page.wait_for_load_state("networkidle")
            time.sleep(2) # Wait for async load

            # Check if still Senior
            # We look for "Level 1A" which is specific to Senior syllabus
            if page.locator('text=Level 1A').count() > 0:
                print("SUCCESS: Found 'Level 1A' after reload. Persistence verified.")
            else:
                print("FAILURE: Did not find 'Level 1A' after reload.")

            page.screenshot(path="verification/reloaded.png")
            print("Screenshot saved to verification/reloaded.png")

        except Exception as e:
            print(f"Error during interaction: {e}")

        browser.close()

if __name__ == "__main__":
    run()
