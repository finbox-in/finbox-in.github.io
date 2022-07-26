# DeviceConnect: Salt Generation

Salt is generated at the client side for Authentication

## Calculate salt

Salt is calculated as follows:
1. A = Create MD5 hash of `CUSTOMER_ID`
2. B = Concatenate string of A and `SERVER_HASH` shared by FinBox.
3. C = Create an SHA-256 hash of B
4. Salt = base64 encoded version of C

Sample code for salt generation in different languages:

<CodeSwitcher :languages="{java:'Java',python:'Python',go:'Go',php:'PHP'}">
<template v-slot:java>

```java
import java.security.*;
import java.util.*;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;
​
​
public class SaltGeneration {
    private static final int HEX_255 = 0xFF;
    private static final String UNICODE_TRANSFORMATIONAL_FORMAT_8_BIT = "UTF-8";
    private static String CUSTOMER_ID = "<CUSTOMER_ID>";
    private static String SERVER_HASH = "<SERVER_HASH>";
    
    private static String getSaltForBody() {
        String hashedOutput = getMd5Hash(CUSTOMER_ID);
        String concatString = hashedOutput + SERVER_HASH;
        String shaOutput = get256Encoded(concatString);
        return shaOutput;
    }
​
​
    private static String getMd5Hash(final String s) {
        try {
            // Create MD5 Hash
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(s.getBytes(Charset.forName(UNICODE_TRANSFORMATIONAL_FORMAT_8_BIT)));
            byte[] messageDigest = digest.digest();
    
            // Create Hex String
            StringBuilder hexString = new StringBuilder();
            for (byte mDigest : messageDigest) {
                StringBuilder h = new StringBuilder(Integer.toHexString(HEX_255 & mDigest));
                while (h.length() < 2) {
                    h.insert(0, "0");
                }
                hexString.append(h);
            }
            return hexString.toString().toUpperCase();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
​
    /**
     * Method converts the string into SHA 256 and returns it
     *
     * @param s String to be 256 encoded
     * @return Converted 256 hash
     */
    private static String get256Encoded(final String text) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

</template>
<template v-slot:python>

```python
import hashlib, base64

def create_salt(customer_id, server_hash):
    """
    Takes customer_id (unique identifier of customer)
    and server_hash (shared by FinBox) as input
    and returns salt in response
    """
    customer_hash = hashlib.md5(customer_id.encode('utf-8')).hexdigest().upper()
    intermediate_hash = customer_hash + server_hash
    salt_encoded = hashlib.sha256(intermediate_hash.encode('utf-8')).digest()
    salt = base64.b64encode(salt_encoded).decode()
    return salt
```

</template>

<template v-slot:go>

```go
import (
	"crypto/md5"
	"crypto/sha256"
	"fmt"
	"encoding/base64"
	"encoding/hex"
	"strings"
)
func GetSaltForCustomer(customerId string, serverHash string) string {
    hasher := md5.New()
	hasher.Write([]byte(customerId))
	hexHasher := hex.EncodeToString(hasher.Sum(nil))
	data := strings.ToUpper(hexHasher)+ serverHash
	newSha256 := sha256.New()
	newSha256.Write([]byte(data))
    finalData := base64.StdEncoding.EncodeToString(newSha256.Sum(nil))
	return finalData
}
```

</template>

<template v-slot:php>

```php
function create_salt($customer_id, $server_hash) {
    $customer_hash = strtoupper(md5($customer_id));
    $intermediate_hash = $customer_hash."".$server_hash;
    $salt_encoded = openssl_digest($intermediate_hash, 'sha256', true);
    $salt = base64_encode($sha_hash);
    return $salt;
}
```

</template>

<template v-slot:ruby>

```ruby
require 'digest'
require 'base64'

def create_salt(customer_id, server_hash)
    customer_hash = Digest::MD5.hexdigest(customer_id).upcase
    intermediate_hash = customer_hash << server_hash
    salt_encoded = Digest::SHA256.digest intermediate_hash
    salt = Base64.encode64(salt_encoded)
    return salt
end
```

</template>

</CodeSwitcher>


## Debug Salt Generation

You can cross check each individual step of your salt generation logic by using the following parameters

```
customer_id = 82169C6312B50CA8233482169F9F288F812B5C02114A6A74E9A62
server_hash = 5f8cd80c69a34b9785dc66298eabe95b
```


**Step A Result - Hexdigest of MD5Hash** 

`7B85689C14D32209779241F14A09C29B`


**Step B Result -  Intermediate Hash** 

`7B85689C14D32209779241F14A09C29B5f8cd80c69a34b9785dc66298eabe95b`


**Step C Result - Hexdigest Version**

 `2a2e163b66dbcd838bd6d122e17038e90f2ba5c0b6ca295364c84e19746ca8e4`

 Note: The result for Step C shared above is generated by doing a hexdigest rather than a digest. It is shared for comparison purposes only. In the actual code you must use digest rather than haxdigest for Step 3.

**Final Result - Salt**

`Ki4WO2bbzYOL1tEi4XA46Q8rpcC2yilTZMhOGXRsqOQ=`
