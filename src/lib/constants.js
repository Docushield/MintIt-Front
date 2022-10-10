export const EXAMPLE_PATH = "blog-starter";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL =
    "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";
export const PROOF_FOR_STARTING_INDEX = `(defun random-integer:integer
    ()
    (bind (chain-data)
        { 
            'block-height := block-height, 
            'block-time := block-time
        }
    (round (* block-height (diff-time block-time (time "1970-01-01T00:00:00Z")))))
)`;
